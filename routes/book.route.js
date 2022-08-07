module.exports = app => {
    const books = require("../controllers/bookController.js");
    var router = require("express").Router();
   
    router.post("/", books.create);
    router.get("/", books.findAll);
    router.get("/language", books.findAllEnglishLanguageBooks);
    router.get("/:id", books.findOne);
    router.put("/:id", books.update);
    router.delete("/:id", books.delete);
    router.delete("/", books.deleteAll);

    app.use('/api/books', router);
};