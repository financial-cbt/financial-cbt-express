const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
  nickname: { type: String, required: true },
});
const Board = mongoose.model("Board", boardSchema);

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  createdAt: { type: String, default: Date.now },
  updatedAt: { type: String, default: Date.now },
  nickname: { type: String, required: true },
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Board, Comment };
