import bcrypt from "bcrypt";

const saltRounds = 2;

export const createUserTestData = async () => {
  return [
    {
      username: "testuser1@test.test",
      name: "Test User",
      passwordHash: await bcrypt.hash("test_password1", saltRounds),
    },
    {
      username: "testuser2@test.test",
      name: "Test User2",
      passwordHash: await bcrypt.hash("test_password2", saltRounds),
    },
  ];
};
