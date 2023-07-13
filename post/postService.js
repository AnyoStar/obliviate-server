const db = require("../db/db.js");

const addPost = (req, res) => {
  //포스트 추가
  const body = req.body;
  const {title, content, user_id} = body;

  if(!(title && content && user_id)) {
    return res.json({
      error: "INVALID PARAMETER",
    });
  }

  const d = Date.now();

  const insertQuery = "INSERT INTO posts(title, content, user, created_at, expire_date) VALUES(?, ?, ?, ?, ?)";
  const insertParameters = [title, content, user_id, d, d + 86400000];

  db.run(insertQuery, insertParameters, (error) => {
    if(error) {
      console.error(error);
      return res.json({
        error: error.message,
      });
    }

    return res.json({
      message: "데이터 삽입 성공",
      data: "SUCCESS",
    });
  });
};

const livePosts = (req, res) => {
  const d = Date.now();

  db.all("SELECT * FROM posts WHERE expire_date > ?", [d], (error, posts) => {
    if (error) {
      console.error(error);
      return res.json({
        error: error.message,
      });
    }

    if (posts === null) {
      return res.json({
        message: "기억에 남은 포스트가 없습니다.",
      });
    }
    return res.json({
      data: posts,
    });
  });
};

const expiredPosts = (req, res) => {
  const d = Date.now();

  db.all("SELECT * FROM posts WHERE expire_date <= ?", [d], (error, posts) => {
    if (error) {
      console.error(error);
      return res.json({
        error: error.message,
      });
    }

    if (posts === null) {
      return res.json({
        message: "잊혀진 포스트가 없습니다.",
      });
    }
    return res.json({
      data: posts,
    });
  });
};

module.exports = {
  addPost,
  livePosts,
  expiredPosts,
};
