const { Router } = require("express");
const { auth, checkRole } = require("../middleware/auth.middleware");
const {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");

const bookRouter = Router();

bookRouter.get("/", auth, checkRole(["VIEWER", "VIEW_ALL"]), getAllBooks);

bookRouter.post("/", auth, checkRole(["CREATOR"]), addBook);
bookRouter.patch("/:id", auth, checkRole(["VIEWER", "VIEW_ALL"]), updateBook);
bookRouter.delete("/:id", auth, checkRole(["CREATOR"]), deleteBook);

module.exports = bookRouter;
