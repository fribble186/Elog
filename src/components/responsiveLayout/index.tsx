import React, { useState, useCallback, useEffect, useMemo } from "react";
import type { IMenu } from "../../App";
import styles from "./index.css";

import MoblieMenu from "../mobileMenu";
import WebMenu from "../webMenu";

const WEBWIDTH = 800;

const ResponsiveLayout = (props: {
  children: any;
  menu: IMenu | undefined;
}) => {

  const [isWeb, setIsWeb] = useState(
    document.documentElement.clientWidth > WEBWIDTH
  );

  const onResize = useCallback(() => {
    setIsWeb(document.documentElement.clientWidth > WEBWIDTH);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return <div className={isWeb ? styles.webContainer : styles.mobileContainer}>
    {isWeb ? <WebMenu menu={props.menu}/> : <MoblieMenu menu={props.menu}/>}
    <div className={styles.contentContainer}>
    {React.Children.map(props.children, child => {
      return React.cloneElement(child, {isWeb})
    })}
    </div>
  </div>;
};

export default ResponsiveLayout;
