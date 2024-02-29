var express = require('express');
var router = express.Router();
const User = require('../models/User');

const { createToken, verifyToken } = require('../utils/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, nickName } = req.body;
    const user = await User.signUp(email, password, nickName);
    console.log(req.body);
    res.json(req.body)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "email, password, nickName을 정확히 입력해주세요." });
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    console.log(user)

    const tokenMaxAge = 60 * 60 * 24 * 3;
    const token = createToken(user, tokenMaxAge);

    user.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: tokenMaxAge * 1000,
    }); // 쿠키로 토큰 보내기

    res.status(201).json(user); // 응답의 body로도 보낸다
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "email, password를 확인해주세요." });
  }
})

async function authenticate(req, res, next) {
  let token = req.cookies.authToken;
  let headerToken = req.headers.authorization;
  if (!token && headerToken) { // 토큰이 없고 헤더가 있는 경우
    token = headerToken.split(" ")[1];
  }

  const user = verifyToken(token);
  req.user = user;

  if (!user) {
    const error = new Error("Authorization Failed");
    error.status = 403;
    next(error);
  }
  next();
}

router.get("/protected", authenticate, async (req, res, next) => {
  console.log(req.user);
  res.json({ data: "민감한 데이터" });
});

router.all("/logout", async (req, res, next) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.json({ message: "로그아웃 완료" });
  } catch (err) {
    console.error(err);
    res.json(err)
  }
});

module.exports = router;
