import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(e));
};
