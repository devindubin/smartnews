import React from "react";

const ArticleModal = ({ title, author, content }) => {
  return (
    <div className="article-modal">
      ArticleModal
      <p className="article-modal__title">{title}</p>
      <p className="article-modal__author">{author}</p>
      <p className="article-modal__content">{content}</p>
    </div>
  );
};

export default ArticleModal;
