import "dotenv/config";
import express from "express";
import { logger } from "./middlewares/logEvents.js";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";
import newsRouter from "./routes/newsRouter.js";
import { connectDB } from "./config/dbConn.js";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { credentials } from "./middlewares/credentials.js";
import { verifyJWT } from "./middlewares/verifyJWT.js";
import { getArticlesOnSchedule } from "./controllers/newsControllers.js";
import path from "path";

const __dirname = import.meta.dirname;
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();
getArticlesOnSchedule();

// app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.set("trust proxy", 1);
app.use(credentials);
app.use(
  cors({
    origin: "https://www.smrtnews.org",
    optionsSuccessStatus: 200,
  })
);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req, res) => {
  if (req.headers?.accept?.includes("text/html")) {
    res.send("Hello World");
  } else {
    res.json({ message: "Hello World" });
  }
});

app.use("/auth", authRouter);
app.use(verifyJWT);
app.use("/posts", postRouter);
app.use("/news", newsRouter);

app.all("*", (req, res) => {
  res.status(304);
  res.redirect("/");
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
