// import { logEvents } from "../../../backend/middlewares/logEvents";
import axios from "../api/axios";
import { useAuth } from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      // logEvents(error, "hooksLog.txt");
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
