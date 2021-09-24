import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./index.css";
import getConfig from "./configs/getConfig";

import ResponsiveLayout from "./components/responsiveLayout";
import Loading from "./components/loading";
import FlatHome from "./components/flatHome";
import ListHome from "./components/listHome";
import Homepage from "./components/homepage";
import Detail from "./components/detail";

export interface IMenu {
  websiteName: string;
  menus: Array<{
    key: string;
    label: string;
    datasource: string;
    displayType: string | "flat/list" | "list/flat";
  }>;
}

interface IHomeData {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  imgSrc?: string;
}

interface ICusStyles {
  backgroundColor: string;
}

const Demo = () => {
  const [menu, setMenu] = useState<IMenu | undefined>();
  const [homeData, setHomeData] = useState<IHomeData | undefined>();
  const [cusStyles, setCusStyles] = useState<ICusStyles | undefined>();

  useEffect(() => {
    getConfig("menu.json").then((menu) => setMenu(menu));
    getConfig("homepage.json").then((home) => setHomeData(home));
    getConfig("cusStyles.json").then((style) => setCusStyles(style));
  }, []);

  const Routes = useCallback(({isWeb})=> {
    return (
      <Switch>
        {menu.menus.map((item) => (
          <Route path={`/${item.key}`} key={`/${item.key}`}>
            {item.displayType === "flat/list" ? (
              <FlatHome datasource={item.datasource} needSecure={false} isWeb={isWeb}/>
            ) : (
              <ListHome datasource={item.datasource} />
            )}
          </Route>
        ))}
        <Route path={`/`} key='/'>
          <Homepage data={homeData}/>
        </Route>
      </Switch>
    );
  }, [menu, homeData]);

  return (
    <div className={styles.pageContainer} style={cusStyles ? {background: cusStyles.backgroundColor} : null}>
      {menu ? (
        <Router>
          <ResponsiveLayout menu={menu}>
            <Routes />
          </ResponsiveLayout>
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Demo;
