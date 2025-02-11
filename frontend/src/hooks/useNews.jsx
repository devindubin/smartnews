import { useContext } from "react";
import { NewsContext } from "../context/NewsProvider";

export const useNews = () => {
  return useContext(NewsContext);
};
