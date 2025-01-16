import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    default: "user",
    type: String,
    enum: ["user", "admin", "premium"],
  },
  loggedBy: String,
  documents: [{ name: String, reference: String }],
  last_conection: Date,
});

const userModel = mongoose.model(collection, schema);

export { userModel };
