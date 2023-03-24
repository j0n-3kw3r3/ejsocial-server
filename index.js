const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");
const messagesRoute = require("./Routes/messages");
const conversationsRoute = require("./Routes/conversations");
const multer = require("multer");
const path = require("path");
dotenv.config();

//conecting mongodb database

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

connectDB();

app.use("/images", express.static(path.join(__dirname, "./public/images")));

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: async (req, file, cb) => {
    await cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    return await res.status(200).json("File uploaded successfully.");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(PORT, () => console.log("Server is running on:", PORT));
