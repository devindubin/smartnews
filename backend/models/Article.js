import mongoose from "mongoose";
import axios from "axios";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
const articleSchema = new mongoose.Schema({
  rawText: String,
  sentiment: Number,

  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: { type: String, unique: true },
  urlToImage: String,
  publishedAt: String,
  content: String,
});

const Article = mongoose.model("article", articleSchema);

export default Article;
