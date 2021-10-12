import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import url from "./url";

const Homepage = () => {
  const [FaasWord, setFaasWord] = useState("");
  useEffect(() => {
    axios
      .get(url, { params: { password: 123 } })
      .then((res: any) => setFaasWord(res?.data?.data));
  }, []);
  return (
    <div className="demoDiv">
      <div>我是模块联邦的homepage</div>
      <div>{FaasWord}</div>
    </div>
  );
};

export default Homepage;
