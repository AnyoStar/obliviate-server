const db = require("../db/db.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const checkDuplicateEmail = (req, res) => {
  const requestEmail = req.query.email;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [requestEmail],
    (error, user) => {
      if (error) {
        console.error(error);
        return res.json({
          error: error.message,
        });
      }
      //유저가 있으면 이미 데이터베이스에 이메일이 있다.
      if (user) {
        return res.json({
          data: true,
        });
      }
      return res.json({
        message: "사용 가능한 이메일입니다.",
        data: false,
      });
    }
  );
};

const checkDuplicateUsername = (req, res) => {
  const requestName = req.query.username;

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [requestName],
    (error, user) => {
      if (error) {
        console.error(error);
        return res.json({
          error: error.message,
        });
      }
      //유저가 있으면 이미 데이터베이스에 닉네임이 있다.
      if (user) {
        return res.json({
          data: true,
        });
      }
      return res.json({
        message: "사용 가능한 닉네임입니다.",
        data: false,
      });
    }
  );
};

const register = (req, res) => {
  const registerInfo = req.body;

  console.log("이메일은 : " + registerInfo.email);
  console.log("비밀번호는 : " + registerInfo.password);
  console.log("닉네임은 : " + registerInfo.nickname);

  const hashedPassword = crypto
    .createHash("sha256")
    .update(registerInfo.password)
    .digest("hex");

  // 먼저 가입 요청한 이메일을 db에 검색해서 있으면
  db.get(
    "SELECT * FROM users WHERE email = ?",
    [registerInfo.email],
    (error, user) => {
      if (error) {
        console.error(error);
        return res.json({
          error: error.message,
        });
      }
      // 에러 응답
      if (user) {
        return res.json({
          error: "USER_EXIST",
        });
      }
      // 회원 가입 처리
      db.run(
        "INSERT INTO users (email,password,username) VALUES (?,?,?)",
        [registerInfo.email, hashedPassword, registerInfo.nickname],

        //쿼리가 실행된 다음 함수가 실행된다.
        (error) => {
          if (error) {
            console.error(error);
            return res.json({
              error: error.message,
            });
          }
          console.log("데이터 삽입 성공");
          return res.json({
            message: "데이터 삽입 성공",
            data: registerInfo,
          });
        }
      );
    }
  );

  const responseData = {
    message: "데이터를 잘 받았습니다.",
  };
};

const login = (req, res) => {
  const requestBody = req.body;

  const requestEmail = requestBody.email;
  const requestPassword = requestBody.password;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(requestPassword)
    .digest("hex");

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [requestEmail],
    (error, user) => {
      if (error) {
        console.error(error);
        const responseData = {
          error: error.message,
        };
        return res.json(responseData);
      }
      if (!user) {
        const responseData = {
          error: "LOGIN_FAIL",
        };
        return res.json(responseData);
      }

      if (hashedPassword !== user.password) {
        const responseData = {
          error: "LOGIN_FAIL",
        };
        return res.json(responseData);
      }

      const token = jwt.sign(user, "key", {
        expiresIn: "3h", //토큰의 만료 기간
      });

      return res.json({
        message: "로그인 가능. 근데 더 해야함",
        data: token,
      });
    }
  );
};

module.exports = {
  checkDuplicateEmail,
  checkDuplicateUsername,
  register,
  login,
};
