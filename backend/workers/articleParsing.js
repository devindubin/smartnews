import { Queue } from "bullmq";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import Article from "../models/Article.js";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
import { logEvents } from "../middlewares/logEvents.js";
import { CronJob } from "cron";
import axios from "axios";

const pullText = async (url) => {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data, { url: url });
    const articleObj = new Readability(dom.window.document).parse();
    if (articleObj?.textContent) {
      return articleObj.textContent.trim();
    } else {
      throw new Error("Text Parsing Failed");
    }
  } catch (error) {
    return error.message;
  }
};

// Add jobs to the queue
// 1) find record without raw text
// 2) add record and id to queue

const connectionOptions = {
  host: "redis",
  port: 6379,
};

const redisConnection = new IORedis(connectionOptions, {
  maxRetriesPerRequest: null,
});

const articleQueue = new Queue("article.parsing", {
  connection: redisConnection,
});
const findMissing = async () => {
  logEvents("Starting findMissing()", "workerLog.txt");
  try {
    const articles = await Article.find({ rawText: { $exists: false } }).limit(
      100
    );
    logEvents(
      `Article Count with Missing Text: ${articles.length}`,
      "workerLog.txt"
    );
    if (articles.length !== 0) {
      for (const article of articles) {
        logEvents(`Article Found: ${article.url}`, "workerLog.txt");
        await articleQueue.add(article._id, { link: article.url });
      }
    }
  } catch (error) {
    logEvents(`Error Enqueing Records: ${error}`, "workerLog.txt");
  }
};

export const findMissingCronJob = async () => {
  logEvents(`Running Article Text Parsing Worker`, "workerLog.txt");
  const cronJob = CronJob.from({
    cronTime: "*/8 * * * *",
    onTick: findMissing,
    runOnInit: true,
  });
  cronJob.start();
};

const worker = new Worker(
  "article.parsing",
  async (job) => {
    const { link } = job.data;
    const result = await pullText(link);
    const updatedArticle = await Article.findByIdAndUpdate(job.name, {
      rawText: result,
    }).exec();

    // 2) store record in queue
  },
  { connection: redisConnection }
);

worker.on("waiting", async (job) => {
  logEvents(`${job.name} Waiting \t${job.id}`, "workerLog.txt");
});

worker.on("completed", async (job) => {
  logEvents(`${job.name} Completed\t${job.id}`, "workerLog.txt");
  await job.remove();
});

worker.on("failed", (job, err) => {
  logEvents(`${job.name} Failed\t${job.id}\t${err}`, "workerLog.txt");
});
