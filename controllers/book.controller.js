import Book from "../models/book.model.js";

export const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(400).json({ message: "No products found" });
  }
  return res.status(200).json({ books });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(400).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

export const addBook = async (req, res, next) => {
  const { name, author, description, price } = req.body;
  let book;
  const image = req.file ? req.file.path : "";
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      image,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};

export const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price } = req.body;
  let book;
  const image = req.file ? req.file.path : "";

  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(400).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

export const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(400).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};
