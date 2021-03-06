import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./index.css";
import getConfig from "./configs/getConfig";
import axios from "axios";

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
  const [MFPriority, setMFPriority] = useState<number>(0); // 0 未知，1 优先 MF，-1 使用本地
  const [MFHomepage, setMFHomepage] = useState<any>();
  const [MFFlatHome, setMFFlatHome] = useState<any>();
  const [MFListHome, setMFListHome] = useState<any>();
  const [MFMDDetail, setMFMDDetail] = useState<any>();
  const [MFLayout, setMFLayout] = useState<any>();

  useEffect(() => {
    getConfig("menu.json").then((menu) => setMenu(menu));
    getConfig("homepage.json").then((home) => setHomeData(home));
    getConfig("cusStyles.json").then((style) => setCusStyles(style));
    axios({
      method: "get",
      url: `/remoteEntry.js`,
    })
      .then(() => setMFPriority(1))
      .catch(() => setMFPriority(-1));
  }, []);

  useEffect(() => {
    if (MFPriority === 1) {
      // @ts-ignore
      import("MF_module/Homepage")
        .then((homepage) => setMFHomepage(homepage))
        .catch((e) => console.log("CAN NOT LOAD homepage MF SLOT", e))
        .finally(() => setMFPriority((priority) => priority + 1));
      // @ts-ignore
      import("MF_module/FlatHome")
        .then((flatHome) => setMFFlatHome(flatHome))
        .catch((e) => console.log("CAN NOT LOAD flatHome MF SLOT", e))
        .finally(() => setMFPriority((priority) => priority + 1));
      // @ts-ignore
      import("MF_module/ListHome")
        .then((listHome) => setMFListHome(listHome))
        .catch((e) => console.log("CAN NOT LOAD listHome MF SLOT", e))
        .finally(() => setMFPriority((priority) => priority + 1));
      // @ts-ignore
      import("MF_module/MDDetail")
        .then((detail) => setMFMDDetail(detail))
        .catch((e) => console.log("CAN NOT LOAD MDDetail MF SLOT", e))
        .finally(() => setMFPriority((priority) => priority + 1));
      // @ts-ignore
      import("MF_module/MFLayout")
        .then((layout) => setMFLayout(layout))
        .catch((e) => console.log("CAN NOT LOAD MFLayout MF SLOT", e))
        .finally(() => setMFPriority((priority) => priority + 1));
    }
  }, [MFPriority]);

  const Routes = useCallback(
    ({ isWeb }) => {
      document.title = menu?.websiteName;
      if (MFPriority < 6 && MFPriority >= 0) {
        return null;
      } else {
        return (
          <Switch>
            {menu.menus.map((item) => {
              return (
                <Route
                  path={`/${item.key}/:detailKey`}
                  key={`/${item.key}/detailKey`}
                >
                  {MFMDDetail ? (
                    <MFMDDetail.default
                      getMdDataSource={(mdSrc: string) => {
                        if (mdSrc) return getConfig(mdSrc);
                      }}
                    />
                  ) : (
                    <MDDetail
                      getMdDataSource={(mdSrc: string) => {
                        if (mdSrc) return getConfig(mdSrc);
                      }}
                    />
                  )}
                </Route>
              );
            })}
            {menu.menus.map((item) => (
              <Route path={`/${item.key}`} key={`/${item.key}`}>
                {item.displayType === "flat/list" ? (
                  MFFlatHome ? (
                    <MFFlatHome
                      getDataSource={() => getConfig(item.datasource)}
                      isWeb={isWeb}
                      needSecure={!!item?.needSecure}
                    />
                  ) : (
                    <FlatHome
                      getDataSource={() => getConfig(item.datasource)}
                      isWeb={isWeb}
                      needSecure={!!item?.needSecure}
                    />
                  )
                ) : MFListHome ? (
                  <MFListHome
                    getDataSource={() => getConfig(item.datasource)}
                    isWeb={isWeb}
                  />
                ) : (
                  <ListHome
                    getDataSource={() => getConfig(item.datasource)}
                    isWeb={isWeb}
                  />
                )}
              </Route>
            ))}
            <Route path={`/`} key="/">
              {MFHomepage ? (
                <MFHomepage.default dataSource={homeData} isWeb={isWeb} />
              ) : (
                <Homepage dataSource={homeData} isWeb={isWeb} />
              )}
            </Route>
          </Switch>
        );
      }
    },
    [menu, homeData, MFPriority, MFHomepage, MFFlatHome, MFListHome, MFMDDetail]
  );

  return (
    <div
      className={styles.pageContainer}
      style={
        cusStyles
          ? {
              background: cusStyles.backgroundColor,
              color: cusStyles.fontColor,
              backgroundImage: cusStyles.backgroundImage,
            }
          : null
      }
    >
      {menu ? (
        <Router>
          {MFPriority < 6 && MFPriority >= 0 ? null : MFLayout ? (
            <MFLayout menu={menu}>
              <Routes />
            </MFLayout>
          ) : (
            <ResponsiveLayout menu={menu}>
              <Routes />
            </ResponsiveLayout>
          )}
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Demo;
