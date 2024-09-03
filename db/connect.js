import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState === 1) {
      console.log("Connected to MongoDB");
      return Promise.resolve(true);
    } else {
      console.log(
        "MongoDB connection is not ready. State:",
        connection.readyState
      );
      return Promise.resolve(false);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return Promise.reject(error);
  }
};
