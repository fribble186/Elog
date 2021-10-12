import React, {useState, useEffect} from "react";
import styles from "./index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useHistory} from "react-router-dom";
import getConfig from "../../configs/getConfig";

const MDDetail = () => {
  const history = useHistory();
  const [contentStr, setContentStr] = useState<string | undefined>();

  useEffect(() => {
    if (history) {
      const [_, menuKey, ...detailRoute] = history.location.pathname.split('/');
      const contentSrc = detailRoute.join('/')
      console.log(contentSrc)
      getConfig(contentSrc).then((data: any) => {
        console.log(data);
        if (data.__esModule) {
          setContentStr(data.default);
        } else {
          setContentStr(data);
        }
      })
    }
  }, [history])
  return (
    <div className={styles.detail}>
      <div className={styles.goBack} onClick={() => history.goBack()}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          ></path>
        </svg>
        <span>返回</span>
      </div>
      <ReactMarkdown children={contentStr} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default MDDetail;
