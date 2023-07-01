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
  용아야 빨리 프론트 앤드 작성 좀 해라
  `);
});
