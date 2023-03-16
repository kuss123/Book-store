import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnect } from "./mongo/dbConnection.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(morgan("combined"));
import bookRoute from "./routes/book.route.js";

dbConnect();

app.use("/book", bookRoute);

app.listen(process.env.PORT, () => {
  console.log("Server connected successfully");
});
2;
