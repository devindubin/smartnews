import { AlertContext } from "../context/AlertProvider";
import { useContext } from "react";

export const useAlert = () => {
  return useContext(AlertContext);
};
