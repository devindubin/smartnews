import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../hooks/useAuth";
// import { logEvents } from "../../../backend/middlewares/logEvents";

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        // logEvents(error, "hooksLog.txt");
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    //check for accesstoken, if there is none verify refresh, else set loading to false
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading...</p> // good place for spinnner element
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistentLogin;
