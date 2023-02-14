import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";
//for hashing the passwords before storing in DB
import bcrypt from "bcrypt";
const saltRounds = 10; //determines the intensity of hashing

dotenv.config();
connectDB();

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  // console.log(req.body);
  const user = await User.find({
    username: req.query.username,
    password: req.query.password,
  });
  res.send(user);
  console.log(user);
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  const user = await User.find({
    username: req.body.username,
  });
  console.log(user);
  if (user.length === 0) {
    res.status(404);
    res.send({ message: "Invalid username / password!" });
  } else {
    console.log(user);
    bcrypt.compare(req.body.password, user[0].password, function (err, result) {
      if (result === true) res.send({ message: "Found the user" });
      else res.send({ message: "Invalid username / password!" });
    });
  }
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const checkingExistingUser = await User.find({
    username: req.body.username,
  });
  if (checkingExistingUser.length === 0) {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
      });
      console.log(user);
      res.status(201).json({ message: "Created user" });
    });
  } else {
    res.send({
      message: "Account with this username already exists, Please login",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Sevrer running on http:localhost:${PORT}`);
});
