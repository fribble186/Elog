import React from "react";
import styles from "./index.css";

const Detail = ({
  children,
  clearDetailSrc,
}: {
  children: JSX.Element;
  clearDetailSrc: () => void;
}) => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.displayZone}  onClick={clearDetailSrc}>{children}</div>
    </div>
  );
};

export default Detail;
