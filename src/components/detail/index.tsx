import React from "react";
import styles from "./index.css";

const Detail = ({
  children,
  clearDetailSrc,
  isWeb
}: {
  children: JSX.Element;
  clearDetailSrc: () => void;
  isWeb: boolean
}) => {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.displayZone} style={isWeb ? null : {height: '90vh'}} onClick={clearDetailSrc}>{children}</div>
    </div>
  );
};

export default Detail;
