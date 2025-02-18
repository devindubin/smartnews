import { axiosNewsClient } from "../api/axios.js";
import { CronJob } from "cron";
import Article from "../models/Article.js";
import { logEvents } from "../middlewares/logEvents.js";
import e from "express";
export const getArticlesByTopic = async (req, res) => {
  try {
    const response = await axiosNewsClient.get("/everything", {
      params: { q: "science" },
    });

    return res.status(201).json(response.data);
  } catch (error) {
    logEvents(error, "newsErrorLog.txt");
  }
};

export const getArticlesOnSchedule = async () => {
  logEvents("Running Schedule", "newsControllerLog.txt");
  const job = CronJob.from({
    cronTime: "*/10 * * * *",
    onTick: async () => {
      try {
        const response = await axiosNewsClient.get("/everything", {
          params: { q: "science" },
        });
        const data = response.data?.articles;

        const result = await Article.insertMany(data, { ordered: false });
        if (result)
          logEvents("getArticleOnSchedule Success", "newsControllerLog.txt");
      } catch (error) {
        if (error.errorResponse?.code === 11000) {
          logEvents("Duplicates Found", "newsControllerLog.txt");

          logEvents(
            `Unique Records Found and Inserted: ${error.result.insertedIds}`,
            "newsControllerLog.txt"
          );
        } else {
          logEvents(error, "newsErrorLog.txt");
        }
      }
    },
    runOnInit: true,
  });
  job.start();
};
