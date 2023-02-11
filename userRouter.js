const express = require("express");
const router = express.Router();

// database:
const users = [
  {
    id: "1",
    name: "As'ad",
    job: "Programmer",
    email: "asad@binar.com",
    password: "test123",
  },
  {
    id: "2",
    name: "Laksman",
    job: "Programmer",
    email: "laksman@binar.com",
    password: "test123",
  },
  {
    id: "3",
    name: "Adan",
    job: "Farmer",
    email: "adan@binar.com",
    password: "test123",
  },
  {
    id: "4",
    name: "Kurnia",
    job: "Miliarder",
    email: "kurnia@binar.com",
    password: "test123",
  },
];

// 1
router.get("/user", (req, res) => {
  res.json(users);
});
// 2
router.get("/user/search", (req, res) => {
  const job = req.query.job;
  const filteredUsers = users.filter((user) => user.job === job);
  res.json(filteredUsers);
});
// 3
router.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.json(users.find((user) => user.id === id));
});
// 4
router.post("/user", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ status: "OK", desc: "user created" });
});
// 5
router.delete("/user/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id);
  delete users[index];
  res.json({ status: "OK", desc: "user deleted" });
});

module.exports = router;
