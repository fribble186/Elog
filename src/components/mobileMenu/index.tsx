import React, { useState } from "react";
import type { IMenu } from "../../App";
import styles from "./index.css";
import { useHistory } from "react-router-dom";

const Menu = ({ menu }: { menu: IMenu | undefined }) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  return (<>
    <div className={styles.mobileMenuContainer}>
      <div onClick={()=>{
        setShowMenu(false);
        history.push(`/`);
      }}>{menu.websiteName}</div>
      <div className={styles.flex1} />
      <div onClick={() => setShowMenu((prev) => !prev)}>
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
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          ></path>
        </svg>
      </div>
      {showMenu ? (
        <div className={styles.popupMenuContainer}>
          {menu.menus.map((subMenu) => (
            <div
              key={subMenu.key}
              onClick={() => {
                setShowMenu(false);
                history.push(`/${subMenu.key}`);
              }}
            >
              <span>{subMenu.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
    <div className={styles.mobileMenuContainerFix}/>
  </>);
};

export default Menu;
