import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./index.css";
import getConfig from "./configs/getConfig";

import ResponsiveLayout from "./components/responsiveLayout";
import Loading from "./components/loading";
import FlatHome from "./components/flatHome";
import ListHome from "./components/listHome";
import Homepage from "./components/homepage";
import MDDetail from "./components/mdDetail";

export interface IMenu {
  websiteName: string;
  menus: Array<{
    key: string;
    label: string;
    datasource: string;
    displayType: string | "flat/list" | "list/flat";
    needSecure?: boolean;
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
  fontColor: string;
  backgroundImage: string;
}

const Demo = () => {
  const [menu, setMenu] = useState<IMenu | undefined>();
  const [homeData, setHomeData] = useState<IHomeData | undefined>();
  const [cusStyles, setCusStyles] = useState<ICusStyles | undefined>();
  const [MFHomepage, setMFHomepage] = useState<any>();

  useEffect(() => {
    getConfig("menu.json").then((menu) => setMenu(menu));
    getConfig("homepage.json").then((home) => setHomeData(home));
    getConfig("cusStyles.json").then((style) => setCusStyles(style));
    // @ts-ignore
    import("MF_module/homepage").then(homepage=>{
      setMFHomepage(homepage)
    }).catch(e=>console.log('CAN NOT LOAD MF OF HOMEPAGE', e));
  }, []);

  const Routes = useCallback(({isWeb})=> {
    document.title = menu?.websiteName;
    return (
      <Switch>
        {menu.menus.map((item) => (
          <Route path={`/${item.key}/:detailKey`} key={`/${item.key}/detailKey`}>
            <MDDetail/>
          </Route>
        ))}
        {menu.menus.map((item) => (
          <Route path={`/${item.key}`} key={`/${item.key}`}>
            {item.displayType === "flat/list" ? (
              <FlatHome datasource={item.datasource} needSecure={!!(item?.needSecure)} isWeb={isWeb}/>
            ) : (
              <ListHome datasource={item.datasource} />
            )}
          </Route>
        ))}
        <Route path={`/`} key='/'>
          {MFHomepage ? <MFHomepage.default dataSource={homeData} isWeb={isWeb}/> : <Homepage dataSource={homeData} isWeb={isWeb}/>}
        </Route>
      </Switch>
    );
  }, [menu, homeData, MFHomepage]);

  return (
    <div className={styles.pageContainer} style={cusStyles ? {background: cusStyles.backgroundColor, color: cusStyles.fontColor, backgroundImage: cusStyles.backgroundImage} : null}>
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
