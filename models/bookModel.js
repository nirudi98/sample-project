// represents the books collection in mongoDB
module.exports = mongoose => {
    const Book = mongoose.model(
      "books",
      mongoose.Schema(
        {
          title: String,
          author: String,
          language: String,
        },
        { timestamps: true }
      )
    );
    return Book;
  };