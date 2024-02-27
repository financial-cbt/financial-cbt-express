var express = require("express");
var router = express.Router();
const { Board, Comment } = require("../models/Board");
const User = require("../models/User");
var { verifyToken } = require("../utils/auth");

//전체 게시글 조회
router.get("/", async (req, res, next) => {
  const data = await Board.find();
  res.json(data);
});

//상세페이지용 특정 게시글 id로 조회
router.get("/:boardId", async (req, res, next) => {
  try {
    const data = await Board.findById(req.params.boardId);
    console.log(req.params.boardId);
    if (!data) {
      return res.status(404).json({ message: "board not found" });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

//로그인된 사용자만 글을 작성할 수 있게함
router.post("/", async (req, res, next) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      nickname: req.body.nickname,
    });
    res.json(board);
  } catch (err) {
    console.error(err);
  }
});

//특정 게시글 id로 수정
router.put("/:boardId", async (req, res, next) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.boardId,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json({
      updatedContent: board,
    });
  } catch (err) {
    console.error(err);
  }
});

//특정 게시글 id로 삭제
router.delete("/:boardId", async (req, res, next) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json({
      message: "Board deleted successfully",
      deletedBoard: board,
    });
  } catch (err) {
    console.error(err);
  }
});

//특정 게시글 댓글 조회
router.get("/:boardId/comment", async (req, res, next) => {
  try {
    const data = await Comment.find({ board: req.params.boardId });
    if (!data) {
      return res.status(404).json({ message: "comment not found" });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

//특정 게시글 id에 댓글 작성
router.post("/:boardId/comment", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      author: req.body.author,
      nickname: req.body.nickname,
      board: req.params.boardId,
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
  }
});

//특정 댓글 삭제
router.delete("/:boardId/comment/:commentId", async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({
      message: "Comment deleted successfully",
      deletedComment: comment,
    });
  } catch (err) {
    console.error(err);
  }
});

router.put("/:boardId/comment/:commentId", async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({
      updatedContent: comment,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
