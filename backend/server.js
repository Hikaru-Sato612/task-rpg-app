const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// DB接続
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "task_app",
  dateStrings: true,
});

db.connect((err) => {
  if (err) {
    console.error("DB接続失敗:", err);
  } else {
    console.log("DB接続成功");
  }
});

// テストAPI
app.get("/", (req, res) => {
  res.send("API OK");
});

app.post("/tasks", (req, res) => {
  const { title, status, description, dueDate, estimatedTime } = req.body;

  const sql = `
    INSERT INTO tasks (title, status, description, due_date, estimated_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      status,
      description ?? null,
      dueDate || null,
      estimatedTime ?? null,
    ],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("DBエラー");
      }
      res.send("タスク追加成功");
    },
  );
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

// ログインAPI
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email=?";
  console.log("login:", email, password);

  db.query(sql, [email], (err, results) => {
    if (results.length === 0) {
      return res.status(401).send("ユーザーが存在しません");
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).send("パスワードが違います");
    }

    res.json({
      message: "ログイン成功",
      userId: user.id,
      username: user.username,
    });
    res.end();
  });
});

app.get("/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DBエラー");
    }

    const formatted = results.map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      description: row.description,
      dueDate: row.due_date,
      estimatedTime: row.estimated_time,
    }));

    res.json(formatted);
  });
});

// 更新API
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, status, description, dueDate, estimatedTime } = req.body;

  const sql = `
    UPDATE tasks
    SET title=?, status=?, description=?, due_date=?, estimated_time=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, status, description, dueDate, estimatedTime, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("DBエラー");
      }
      res.send("更新成功");
    },
  );
  console.log("🔥UPDATE受信", req.body);
});

// 削除API
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("DBエラー");
    }
    res.send("削除成功");
  });
});
