import React from "react";
import FeedItem from "./FeedItem";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { v4 as uuid } from "uuid";
import ArticleModal from "./ArticleModal";

const MainFeed = () => {
  const axiosPrivate = useAxiosPrivate();
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts = await axiosPrivate.get("/news/articles");
      console.log("posts", posts);
      setMyData(posts.data.articles);
    };
    getPosts();
  }, []);
  return (
    <div>
      MainFeed
      <div className="main-feed">
        {myData &&
          myData.map((row, ind) => {
            return <FeedItem key={uuid()} {...row} />;
          })}
      </div>
    </div>
  );
};

export default MainFeed;
