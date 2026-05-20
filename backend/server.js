const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./scores.db");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS ranking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            score INTEGER
        )
    `);

});

app.post("/save-score", (req, res) => {

    const { name, score } = req.body;

    db.run(
        "INSERT INTO ranking (name, score) VALUES (?, ?)",
        [name, score],
        (err) => {

            if (err) {

                console.log(err);

                res.status(500).send("保存失敗");

            } else {

                res.send("保存成功");

            }

        }
    );

});

app.get("/ranking", (req, res) => {

    db.all(
        "SELECT name, score FROM ranking ORDER BY score DESC LIMIT 10",
        [],
        (err, rows) => {

            if (err) {

                console.log(err);

                res.status(500).send("取得失敗");

            } else {

                res.json(rows);

            }

        }
    );

});

app.listen(3000, () => {

    console.log("サーバー起動！");
    
});