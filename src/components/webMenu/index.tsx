import React from "react";
import type { IMenu } from "../../App";
import styles from "./index.css";
import {useHistory} from "react-router-dom";

const Menu = (props: { menu: IMenu | undefined }) => {
  const history = useHistory();
  return (
    <div className={styles.webMenuContainer}>
      <div className={styles.title} onClick={()=>history.push(`/`)}>
        <span>{props.menu.websiteName}</span>
      </div>

      {props.menu.menus.map(subMenu => (
        <div className={styles.subMenu} key={subMenu.key} onClick={()=>history.push(`/${subMenu.key}`)}>
            <span>{subMenu.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
