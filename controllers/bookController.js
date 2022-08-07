const db = require("../models");
const Book = db.books;

// Save a new book
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "book title should not be empty!" });
    return;
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.description,
    language: req.body.language
  });
  book.save(book).then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({message:error.message || "error occured while saving book."});
    });
};

// Retrieve all books
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Book.find(condition).then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({message:error.message || "error occurred while retrieving books."});
    });
};

// Find a book using book id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Book.findById(id).then(data => {
      if (!data)
        res.status(404).send({ message: "book not found with id " + id });
      else res.send(data);
    })
    .catch(error => {
      res.status(500).send({ message:error.message || "error retrieving book with id " + id });
    });
};

// Update book details using book id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "book details are required"
        });
      }
      const id = req.params.id;
      Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {if (!data) {
            res.status(404).send({
              message: "cannot update book with id" + id
            });
          } else res.send({ message: "book details updated successfully" });
        })
        .catch(error => {
          res.status(500).send({
            message: "error updating book with id " + id
          });
        });
};

// Delete book using book id
exports.delete = (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: "cannot delete book with id" + id
        });
      } else {
        res.send({
          message: "Book was deleted successfully"
        });
      }
    })
    .catch(error => {
      res.status(500).send({
        message: "failed to delete book with id " + id
      });
    });
  
};

// Delete multiple books
exports.deleteAll = (req, res) => {
    Book.deleteMany({})
    .then(data => {
      res.send({
        message: "${data.deletedCount} books were deleted successfully!"
      });
    })
    .catch(error => {
      res.status(500).send({
        message:
          error.message || "error occurred while deleting books"
      });
    });
};

// Find all published books
exports.findAllEnglishLanguageBooks = (req, res) => {
    Book.find({ language: "english" })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error occured while retrieving books with specific language"
      });
    });
  
};