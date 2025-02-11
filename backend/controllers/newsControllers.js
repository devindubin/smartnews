import { axiosNewsClient } from "../api/axios.js";
import { CronJob } from "cron";
import Article from "../models/Article.js";
export const getArticlesByTopic = async (req, res) => {
  try {
    const response = await axiosNewsClient.get("/everything", {
      params: { q: "science" },
    });

    return res.status(201).json(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesOnSchedule = async () => {
  console.log("Running Schedule");
  const job = CronJob.from({
    cronTime: "*/10 * * * *",
    onTick: async () => {
      try {
        const response = await axiosNewsClient.get("/everything", {
          params: { q: "science" },
        });
        const data = response.data?.articles;

        const result = await Article.insertMany(data, { ordered: false });
        if (result) console.log("success");
      } catch (error) {
        if (error.errorResponse.code === 11000) {
          console.log("Duplicates Found");

          console.log(
            "Unique Records Found and Inserted:",
            error.result.insertedIds
          );
        } else {
          console.log(error);
        }
      }
    },
    runOnInit: true,
  });
  job.start();
};
