const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const wisataRoute = require("./routes/wisataRoute");
const { Authenticated } = require("./middlewares/authenticated");
dotenv.config();

mongoose.connect(
  process.env.DB_HOST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected");
    }
  }
);

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//middleware
app.use("/api/user", userRoute);
app.use("/api", Authenticated, wisataRoute);

app.get("/", (req, res) => {
  return res.send("Server connected");
});

app.listen(PORT, () => {
  console.log("server running");
});
