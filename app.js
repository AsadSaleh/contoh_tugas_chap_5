const express = require("express");
const path = require("path");

const app = express();

const dataPemenang = require("./pemenang.json");

app.set("view engine", "ejs");

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

// Import userRouter:
const userRouter = require("./userRouter");
app.use(userRouter);

// Bikin website sederhana
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/belajar-ejs", (req, res) => {
  res.render("belajar-ejs.ejs", { jsonString: JSON.stringify(dataPemenang) });
});

// 1. Unmatched router handler:
app.use((req, res, next) => {
  res.status(404).json({
    status: "gagal mengakses halaman",
    message: "halaman tersebut tidak ada!!!",
  });
});

// 2. Error handler:
app.use((err, req, res, next) => {
  // ngapain disini terserah kita:
  res.sendFile(path.join(__dirname, "/views/error.html"));
});

// Nyalain servernya:
app.listen(9000, () => {
  console.log("halo, app sudah nyalaaaa~~~");
  console.log("selamat datang~~~!!!");
});
