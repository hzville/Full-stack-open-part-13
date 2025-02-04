import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../../app.js";
import { setupTestDatabase, teardown } from "../../utils/setupTestDatabase.js";
import { createUserTestData } from "./testData.js";
import { User } from "../../models/index.js";

const api = supertest(app);

describe("test for all endpoints using same test database", async () => {
  let testData;
  before(async () => {
    await setupTestDatabase();
    testData = await createUserTestData();
    await User.bulkCreate(testData);
  });
  after(async () => {
    await teardown();
  });
  test("GET /api/users returns correct fields", async () => {
    const response = await api.get("/api/users").expect(200);
    assert.strictEqual(response.body.length, 2);
    response.body.forEach((user) => {
      assert.ok(user.username);
      assert.ok(user.name);
      assert.ok(user.createdAt);
      assert.ok(user.updatedAt);
      assert.strictEqual(user.passwordHash, undefined);
    });
  });
  test("GET /api/users fields contains correct data", async () => {
    const response = await api.get("/api/users").expect(200);
    const apiFirstUser = response.body[0];
    assert.strictEqual(apiFirstUser.username, "testuser1@test.test");
    assert.strictEqual(apiFirstUser.name, "Test User");
  });
  test("POST /api/users creates new user", async () => {
    const newUser = {
      username: "new-user-3@test.test",
      name: "new user 3",
      password: "test_password3",
    };
    const response = await api.post("/api/users").send(newUser);
    assert.deepStrictEqual(response.status, 200);
    assert.strictEqual(response.body.username, "new-user-3@test.test");
    assert.strictEqual(response.body.name, "new user 3");

    const getResponse = await api.get("/api/users").expect(200);
    assert.strictEqual(getResponse.body.length, 3);
    const usernames = getResponse.body.map((user) => user.username);
    assert(usernames.includes("new-user-3@test.test"));
  });
  test("PUT /api/users/:username should update the username", async () => {
    const updateResponse = await api
      .put("/api/users/new-user-3@test.test")
      .send({ newUsername: "updatedUser@test.test" });

    assert.deepStrictEqual(updateResponse.status, 200);
    assert.deepStrictEqual(
      updateResponse.body.username,
      "updatedUser@test.test"
    );
    const response = await api.get("/api/users").expect(200);
    assert.strictEqual(response.body.length, 3);
    const usernames = response.body.map((user) => user.username);
    assert(usernames.includes("updatedUser@test.test"));
  });
  test("POST /api/login return token", async () => {
    const credentials = {
      username: "updatedUser@test.test",
      password: "test_password3",
    };
    const response = await api.post("/api/login").send(credentials);
    assert.deepStrictEqual(response.status, 200);
    assert.strictEqual(response.body.username, "updatedUser@test.test");
    assert.strictEqual(response.body.name, "new user 3");
    assert.ok(response.body.token);
  });
});
