require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const configs = require("./configs");
const passport = require('passport'); // Import Passport
const isAdmin = require('./middlewares/isAdmin');

dotenv.config();

const app = express();
// const ENV = process.env.NODE_ENV || "dev";
// //const { DB_URI, PORT } = configs[ENV];

mongoose
  .connect("mongodb+srv://MEANn_ITI:pass123@cluster2.jabwzqc.mongodb.net/")
  .then(() => {
    console.log("connected to mongodb");
    app.listen(3000, (err) => {
      if (err) return console.log(err);

      return console.log("Server started on port: " +3000);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
require("./utils/passport")(passport);

app.use(passport.initialize());

app.use("/public", express.static("public/"));

// add resources routers
app.use("/auth", require("./routes/auth"));

app.use('/users',require('./routes/user'));



