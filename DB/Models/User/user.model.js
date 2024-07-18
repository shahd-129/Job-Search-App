import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String },
  nested: {
    fristName: { type: String },
    lastName: { type: String },
  },
  email: {
    type: String,
    uniqe: true,
    require: true,
  },
  password: {
    type: String,
    uniqe: true,
  },
  mobileNumber: {
    type: String,
    require: true,
    uniqe: true,
  },
  state: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  reCoveryEmail: {
    type: String,
    require: true,
  },
  role: {
    enum: ["user", "HR"],
    type: String,
    default: "user",
  },
  DOB: {
    type: Date,
  },
  newPassword: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
