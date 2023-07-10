const db = require("../db/db.js");

const addPost = (req, res) => {
  //포스트 추가
  const d = new Date.now();
};

const livePosts = (req, res) => {
  const d = new Date.now();

  db.all("SELECT * FROM posts WHERE expire_date < ?", [d], (error, posts) => {
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
  const d = new Date.now();

  db.all("SELECT * FROM posts WHERE expire_date => ?", [d], (error, posts) => {
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

module.exports = {
  addposts,
  livePosts,
  expiredPosts,
};
