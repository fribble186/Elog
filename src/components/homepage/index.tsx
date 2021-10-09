import React from "react";
import styles from "./index.css";

interface IHomeData {
  title: string;
  subtitle: string;
  description: string;
  imgSrc?: string;
}

const Homepage = ({ dataSource, isWeb }: { dataSource: IHomeData; isWeb: boolean }) => {
  return (
    <div className={styles.homeContainer} style={isWeb ? null :  {height: 'calc(100vh - 100px)'}}>
      <div className={styles.title}>
        <span>{dataSource?.title}</span>
      </div>
      <div className={styles.subtitle}>
        <span>{dataSource?.subtitle}</span>
      </div>
      <div className={styles.description}>
        <span>{dataSource?.description}</span>
      </div>
      {dataSource?.imgSrc ? (
        <div>
          <img src={dataSource.imgSrc} />
        </div>
      ) : null}
    </div>
  );
};

export default Homepage;
