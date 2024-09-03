import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    birthday: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = models.user || model("user", userSchema);
export default Users;
