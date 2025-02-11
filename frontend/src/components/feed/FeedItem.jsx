import React from "react";
import ArticleModal from "./ArticleModal";
import { useNavigate } from "react-router-dom";
const FeedItem = ({
  id,
  author,
  title,
  description,
  source,
  publishedAt,
  content,
}) => {
  const navigate = useNavigate();
  const openArticle = async () => {
    navigate(`/feed/${id}`);
  };

  return (
    <div
      className="item-wrapper"
      onDoubleClick={() => {
        openArticle({ id });
      }}
    >
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
