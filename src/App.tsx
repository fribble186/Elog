import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./index.css";
import getConfig from "./configs/getConfig";

import ResponsiveLayout from "./components/responsiveLayout";
import Loading from "./components/loading";
import FlatHome from "./components/flatHome";
import ListHome from "./components/listHome";
import Detail from "./components/detail";

export interface IMenu {
  websiteName: string;
  displayType: string | "flat/list" | "list/flat";
  menus: Array<{
    name: string;
    datasource: string;
  }>;
}

const Demo = () => {
  const [menu, setMenu] = useState<IMenu | undefined>();

  useEffect(() => {
    getConfig("menu.json").then((menu) => setMenu(menu));
  }, []);

  const Routes = useCallback(() => {
    return (
      <Switch>
        {menu.menus.map((item) => (
          <Route path={`/${item.name}`} key={`/${item.name}`}>
            <FlatHome datasource={item.datasource} needSecure={true}/>
          </Route>
        ))}
      </Switch>
    );
  }, [menu]);

  return (
    <div className={styles.pageContainer}>
      {menu ? (
        <Router>
          <ResponsiveLayout menu={menu}>
          <Routes/>
          </ResponsiveLayout>
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Demo;
