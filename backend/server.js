const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();

app.use(cors());
app.use(express.json());

const db = new Database("scores.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS ranking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        score INTEGER
    )
`).run();

app.post("/save-score", (req, res) => {

    const { name, score } = req.body;

    try {

        db.prepare(
            "INSERT INTO ranking (name, score) VALUES (?, ?)"
        ).run(name, score);

        res.send("保存成功");

    } catch (error) {

        console.log(error);

        res.status(500).send("保存失敗");

    }

});

app.get("/ranking", (req, res) => {

    try {

        const rows = db.prepare(
            "SELECT name, score FROM ranking ORDER BY score DESC LIMIT 10"
        ).all();

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).send("取得失敗");

    }

});

app.listen(3000, () => {

    console.log("サーバー起動！");
    
});