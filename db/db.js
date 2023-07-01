// DB와 연결을 하는 파일
const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("./db/db.db");

module.exports = db;
