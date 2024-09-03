import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return Promise.reject(error);
  }
};
