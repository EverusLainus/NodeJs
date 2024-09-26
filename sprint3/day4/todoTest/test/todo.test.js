const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHttp);
describe("TODO API", () => {
  let todoId;

  it("should create a new TODO", (done) => {
    chai
      .request(server)
      .post("/todos")
      .send({ title: "Test TODO", description: "Test description" })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("title").eql("Test TODO");
        todoId = res.body._id;
        done();
      });
  });

  it("should get all TODOs", (done) => {
    chai
      .request(server)
      .get("/todos")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });

  it("should update a TODO", (done) => {
    chai
      .request(server)
      .put(`/todos/${todoId}`)
      .send({ completed: true })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("completed").eql(true);
        done();
      });
  });

  it("should delete a TODO", (done) => {
    chai
      .request(server)
      .delete(`/todos/${todoId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eql("Todo deleted");
        done();
      });
  });
});
