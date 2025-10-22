const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { createApp } = require("./mock_server_register-endp");

(async () => {
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_login TEXT NOT NULL,
      user_password TEXT NOT NULL
    )
  `);

  const app = createApp(db);
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Mock API server running on port ${port}`);
  });
})();