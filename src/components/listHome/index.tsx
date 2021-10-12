import React, { useState, useEffect } from "react";
import getConfig from "../../configs/getConfig";
import styles from "./index.css";
import {useHistory} from "react-router-dom";

interface IListData {
  portfoliolName: string;
  data: {
    contentSrc: string;
    title: string;
  }[];
}

const ListHome = ({ datasource }: { datasource: string }) => {
  const [listData, setListData] = useState<IListData>();
  const history = useHistory();

  useEffect(() => {
    getConfig(datasource).then((data: IListData) => setListData(data));
  }, []);

  return (
    <div className={styles.listContainer}>
      {listData?.data?.map((artical) => (
        <div className={styles.listItem} key={artical.contentSrc}>
          <div
            className={styles.title}
            onClick={() => history.push(`${location.pathname}/${artical.contentSrc}`)}
          >
            {artical.title}
          </div>
        </div>
      ))}
      {listData?.data?.length ? null : (
        <div className={styles.listItem} style={{borderLeft: 'none'}}>
          <div className={styles.title}>让我想想写什么...</div>
        </div>
      )}
    </div>
  );
};

export default ListHome;
