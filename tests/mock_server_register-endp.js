const express = require("express");
const bodyParser = require("body-parser");

function createApp(db) {
  const app = express();
  app.use(bodyParser.json());

  app.post("/register", async (req, res) => {
    const { user_login, user_password } = req.body;
    if (!user_login || !user_password) return res.status(400).json({ error: "Login and password required." });

    try {
      const user = await db.get("SELECT * FROM users WHERE user_login = ?", [user_login]);
      if (user) {
        if (user.user_password !== user_password) return res.status(401).json({ error: "Incorrect password." });
        return res.status(200).json({ message: "Login successful.", user_id: user.id });
      }

      const result = await db.run(
        "INSERT INTO users (user_login, user_password) VALUES (?, ?)",
        [user_login, user_password]
      );

      return res.status(201).json({ message: "Registration successful.", user_id: result.lastID });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error." });
    }
  });

  return app;
}

module.exports = { createApp };
