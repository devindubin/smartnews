import React from "react";
import ArticleModal from "./ArticleModal";

const FeedItem = ({
  author,
  title,
  description,
  source,
  publishedAt,
  content,
}) => {
  return (
    <div className="item-wrapper">
      <div className="left-box">
        <div className="article-meta">
          <h1 className="article-author">Title: {title}</h1>
          <h3 className="article-title">Author: {author}</h3>
        </div>
        <div className="article-preview">Description: {description}</div>
      </div>
      <div className="right-box">
        <div className="source-analytic-preview">
          <p className="source-name">Source: {source.name}</p>
          <p className="source-id">Source Id: {source.id}</p>
          <p className="source-score">Source Score: </p>
        </div>
        <div className="article-analytic-preview">
          <p className="article-sentiment">Article Sentiment: </p>
          <p className="publishedAt">Published At:{publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
