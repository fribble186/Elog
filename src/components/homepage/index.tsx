import React from "react";
import styles from "./index.css";

interface IHomeData {
  title: string;
  subtitle: string;
  description: string;
  imgSrc?: string;
}

const Homepage = ({ data }: { data: IHomeData }) => {
  console.log(data)
  return (
    <div className={styles.homeContainer}>
      <div className={styles.title}>
        <span>{data?.title}</span>
      </div>
      <div className={styles.subtitle}>
        <span>{data?.subtitle}</span>
      </div>
      <div className={styles.description}>
        <span>{data?.description}</span>
      </div>
      {data?.imgSrc ? (
        <div>
          <img src={data.imgSrc} />
        </div>
      ) : null}
    </div>
  );
};

export default Homepage;