import React, { useState, useEffect } from "react";
import getConfig from "../../configs/getConfig";
import styles from "./index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

interface IListData {
  portfoliolName: string;
  data: {
    contentSrc: string;
    title: string;
  }[];
}

const ListHome = ({ datasource }: { datasource: string }) => {
  const [listData, setListData] = useState<IListData>();
  const [mdSrc, setMdSrc] = useState<string| undefined>();
  const [contentStr, setContentStr] = useState<string | undefined>();

  useEffect(() => {
    getConfig(datasource).then((data: IListData) => setListData(data));
  }, []);

  useEffect(() => {
    if (mdSrc) {
      getConfig(mdSrc).then((data: any) => {
        if (data.__esModule) {
          setContentStr(data.default)
        } else {
          setContentStr(data);
        }
      })
    }
  }, [mdSrc])

  return mdSrc ? (
    <div className={styles.detail}>
      <div className={styles.goBack} onClick={() => setMdSrc(undefined)}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
        <span>返回</span>
      </div>
      <ReactMarkdown children={contentStr} remarkPlugins={[remarkGfm]}/>
    </div>
  ) : (
    <div className={styles.listContainer}>
      {listData?.data?.map((artical) => (
        <div className={styles.listItem} key={artical.contentSrc}>
          <div
            className={styles.title}
            onClick={() => setMdSrc(artical.contentSrc)}
          >
            {artical.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListHome;
