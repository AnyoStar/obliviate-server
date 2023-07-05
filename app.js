const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;

const authService = require("./auth/authService");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/duplicate/email", (req, res) => {
  console.log("클라이언트로부터 전달받은 이메일은 : ", req.query);
  return authService.checkDuplicateEmail(req, res);
});

app.get("/duplicate/username", (req, res) => {
  console.log("클라이언트로부터 전달받은 닉네임은 : ", req.query);
  return authService.checkDuplicateUsername(req, res);
});

app.post("/register", (req, res) => {
  return authService.register(req, res);
});

app.post("/login", (req, res) => {
  return authService.login(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/memo", (req, res) => {
  res.send(`

  용아야 이거 검색창이야 받아

  <div class="search">
    <input type="text" placeholder="검색어 입력">
    <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png">
  </div>

  ========================================= 이 밑은 CSS 파일 ==============

  .search {
    position: relative;
    width: 300px;
  }
  
  input {
    width: 100%;
    border: 1px solid #bbb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }
  
  img {
    position : absolute;
    width: 17px;
    top: 10px;
    right: 12px;
    margin: 0;
  }
  `);
});
