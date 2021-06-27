//react
import React, { useEffect } from "react";
//components
import Inbox from "../Components/ScheduledItems";
import { GetUserInfo } from "../apis/allApis";
const Home = () => {
  useEffect(() => {
    GetUserInfo().then((res) => console.log(res.data));
  }, []);

  return (
    <>
      <Inbox />
    </>
  );
};

export default Home;
