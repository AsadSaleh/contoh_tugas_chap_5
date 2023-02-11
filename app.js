const express = require("express");
const path = require("path");

const app = express();

const dataPemenang = require("./pemenang.json");

app.set("view engine", "ejs");

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

// middleware:
app.use(express.static("public"));
app.use(express.json());

// Buat fungsi loggin, yang dipanggil di setiap request:
const createLog = (req, res, next) => {
  res.on("finish", function () {
    console.log(
      req.method,
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage
    );
  });
  next();
};

app.use(createLog);

// 1
app.get("/user", (req, res) => {
  res.json(users);
});
// 2
app.get("/user/search", (req, res) => {
  const job = req.query.job;
  const filteredUsers = users.filter((user) => user.job === job);
  res.json(filteredUsers);
});
// 3
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  res.json(users.find((user) => user.id === id));
});
// 4
app.post("/user", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ status: "OK", desc: "user created" });
});
// 5
app.delete("/user/:id", (req, res) => {
  const index = users.findIndex((user) => user.id === req.params.id);
  delete users[index];
  res.json({ status: "OK", desc: "user deleted" });
});

// Bikin website sederhana
app.get("/", (req, res) => {
  const hasilJoin = path.join(__dirname, "/views/index.html");
  console.log("apa sih hasil joinnya: ", hasilJoin);
  res.sendFile(hasilJoin);
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/projects.html"));
});

app.get("/belajar-ejs", (req, res) => {
  // res.sendFile(path.join(__dirname), "/view/belajar-ejs.ejs");
  res.render("belajar-ejs.ejs", { jsonString: JSON.stringify(dataPemenang) });
});

// Nyalain servernya:
app.listen(9000, () => {
  console.log("halo, app sudah nyalaaaa~~~");
  console.log("selamat datang~~~!!!");
});
