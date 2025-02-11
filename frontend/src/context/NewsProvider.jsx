import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { v4 as uuid } from "uuid";

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getArticles = async () => {
      const posts = await axiosPrivate.get("/news/articles");
      console.log("posts", posts);
      const news = posts.data.articles;
      const idArticles = news.map((article) => {
        const ID = uuid();

        return { ...article, id: ID };
      });

      setArticles(idArticles);
    };
    getArticles();
  }, []);

  return (
    <NewsContext.Provider value={{ articles, setArticles }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
