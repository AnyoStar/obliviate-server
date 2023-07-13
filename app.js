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
});

app.get("/fetchPost", (req, res) => {
  return postService.livePosts(req, res);
});

app.get("/fetchExpire", (req, res) => {
  return postService.expiredPosts(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/memo", (req, res) => {
  const asdf = Number(Date.now().toString());
  res.send(asdf);
});
