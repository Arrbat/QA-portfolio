const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const supertest = require("supertest");
const { createApp } = require("./mock_server_register-endp");

let db;
let app;
let request;

beforeAll(async () => {
  db = await open({
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

  app = createApp(db);
  request = supertest(app);
});

afterAll(async () => {
  await db.close();
});

describe("User registration/login", () => {
  test("Register new user", async () => {
    const res = await request.post("/register").send({
      user_login: "testuser",
      user_password: "12345"
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user_id");
  });

  test("Login existing user with correct password", async () => {
    const res = await request.post("/register").send({
      user_login: "testuser",
      user_password: "12345"
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful.");
  });

  test("Login existing user with wrong password", async () => {
    const res = await request.post("/register").send({
      user_login: "testuser",
      user_password: "wrong"
    });
    expect(res.status).toBe(401);
  });
});
