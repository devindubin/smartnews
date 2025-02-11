import React from "react";
import { useParams } from "react-router-dom";
import { useNews } from "../../hooks/useNews";
const ArticleModal = () => {
  const { articles } = useNews();
  const { id } = useParams();
  console.log("Length of article list", articles.length);

  const data = articles.filter((article) => article.id === id)[0];
  console.log("data", data);
  let content = undefined;
  if (!data) {
    content = (
      <div className="article-modal">
        <p>No Article Found</p>
      </div>
    );
  } else {
    content = (
      <div className="article-modal">
        ArticleModal
        <p className="article-modal__title">{data.title}</p>
        <p className="article-modal__author">{data.author}</p>
        <p className="article-modal__content">{data.content}</p>
      </div>
    );
  }
  console.log(content);
  return content;
};

export default ArticleModal;
