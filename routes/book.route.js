import { Router } from "express";

import {
  getAllBooks,
  getById,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
const router = Router();

import fs from "fs";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileDestination = ["upload/book/"];
    fileDestination.forEach((destination) => {
      try {
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination, { recursive: true });
        }
      } catch (e) {
        console.log("An error occurred.");
      }
    });

    cb(null, fileDestination[0]);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "").replace(".", "") +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    filesize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/create", upload.single("image"), addBook);
router.get("/getAll", getAllBooks);
router.get("/getById/:id", getById);
router.patch("/update/:id", upload.single("newImage"), updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
