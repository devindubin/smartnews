import myData from "../sampleDB/posts.json" with {type: "json"};

export const handleGetPosts = async (req, res) => {
  return res.status(200).json(myData);
};
