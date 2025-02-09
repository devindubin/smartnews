import { axiosNewsClient } from "../api/axios.js";

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
