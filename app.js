const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;

const authService = require("./auth/authService");
const postService = require("./post/postService");

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

app.post("/addPost", (req, res) => {
  return postService.addPost(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/memo", (req, res) => {
  res.send(`

  용아야 이거 토큰서비스야 받아

  //토큰 검증
  import jwtDecode from "jwt-decode";

  //현재 사용자 정보 가져오기
  export function getCurrrentUser() {
    const jwt = localStorage.getItem("token");
    if(!jwt) {
      return undefined;
   }
    try {
      const decodedToken = jwtDecode(jwt);
      return decodedToken;
    } catch(error) {
      return undefined;
    }
  }

  //로컬 스토리지에 저장된 토큰이 유효한지 판별
  export function isValidJwt() {
    const decodedToken = getCurrrentUser();

    if(decodedToken === undefined) {
      return false;
    }

    if (decodedToken.exp < Date.now() / 1000) {
      return false;
    }

    return true;
  }
  `);
});
