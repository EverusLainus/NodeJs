import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index.js";
import BlogPost from "../models/BlogPost.js";
const should = chai.should();

chai.use(chaiHttp);

describe("Blog API", () => {
  before(async () => {
    await BlogPost.deleteMany({});
  });

  describe("POST /blogs", () => {
    it("should create a new blog post", (done) => {
      const blog = {
        title: "Test Blog",
        content: "This is a test blog post.",
        author: "John Doe",
        tags: ["test", "chai"],
      };
      chai
        .request(server)
        .post("/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql("Test Blog");
          done();
        });
    });

    it("should not create a blog post without title", (done) => {
      const blog = {
        content: "This blog has no title",
        author: "Jane Doe",
      };
      chai
        .request(server)
        .post("/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("GET /blogs", () => {
    it("should get all blog posts with pagination", (done) => {
      chai
        .request(server)
        .get("/blogs?page=1&limit=2")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    it("should filter blog posts by author", (done) => {
      chai
        .request(server)
        .get("/blogs?author=John Doe")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body[0].should.have.property("author").eql("John Doe");
          done();
        });
    });
  });

  describe("PUT /blogs/:id", () => {
    it("should update a blog post", (done) => {
      const blog = new BlogPost({
        title: "Update Blog",
        content: "Initial content",
        author: "Jane Doe",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .put(`/blogs/${blog._id}`)
          .send({ content: "Updated content" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("content").eql("Updated content");
            done();
          });
      });
    });
  });

  describe("DELETE /blogs/:id", () => {
    it("should delete a blog post", (done) => {
      const blog = new BlogPost({
        title: "Delete Blog",
        content: "To be deleted",
        author: "Jane Doe",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .delete(`/blogs/${blog._id}`)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
