import React from "react";
import FeedItem from "./FeedItem";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { v4 as uuid } from "uuid";
import ArticleModal from "./ArticleModal";
import { useNews } from "../../hooks/useNews";

const MainFeed = () => {
  const axiosPrivate = useAxiosPrivate();

  const { articles } = useNews();

  return (
    <div>
      MainFeed
      <div className="main-feed">
        {articles &&
          articles.map((row, ind) => {
            return <FeedItem key={row.id} {...row} />;
          })}
      </div>
    </div>
  );
};

export default MainFeed;
