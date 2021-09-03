import React, { useEffect, useState } from "react";
import getConfig from "../../configs/getConfig";
import styles from "./index.css";
import Encrypt from "../watermark/encrypt";
import Decrypt from "../watermark/decrypt";
import Detail from "../detail";

interface IListData {
  portfoliolName: string;
  data: {
    imgSrc: string;
    imgDesc: string;
    imgLoaded?: boolean;
  }[];
}

const FlatHome = (props: { datasource: string; needSecure: boolean }) => {
  console.log(props);
  const [flatData, setFlatData] = useState<IListData>();
  const [isDEV, setIsDEV] = useState<boolean>(false);
  const [loadedImgTotal, setLoadedImgTotal] = useState<number>(0);
  const [startEncrypt, setStartEncrypt] = useState<boolean>(false);
  const [detailSrc, setDetailSrc] = useState<string | undefined>();

  const INTERVAL = React.useRef<NodeJS.Timer>();
  const devtools = function () {};
  devtools.toString = function () {
    setIsDEV(true);
    return "-";
  };

  const onImgLoaded = () => {
    setLoadedImgTotal((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (flatData?.data?.length === loadedImgTotal) {
      setStartEncrypt(true);
    }
  }, [loadedImgTotal]);

  useEffect(() => {
    getConfig(props.datasource).then((data: IListData) => setFlatData(data));
    if (props.needSecure) {
      document.oncontextmenu = function () {
        return false;
      };
      document.ondragstart = function () {
        return false;
      };
      INTERVAL.current = setInterval(() => {
        // @ts-ignore
        console.profile(devtools);
        // @ts-ignore
        console.profileEnd(devtools);
        if (
          window.outerWidth - window.innerWidth > 20 ||
          window.outerHeight - window.innerHeight > 120
        ) {
          console.log("关掉调试窗口吧");
          setIsDEV(true);
        }
      }, 1000);
      return () => {
        document.oncontextmenu = null;
        document.ondragstart = null;
        clearInterval(INTERVAL.current);
        INTERVAL.current = null;
      };
    }
  }, []);

  return isDEV ? null : detailSrc ? (
    <Detail clearDetailSrc={() => {setDetailSrc(undefined); setLoadedImgTotal(0); setStartEncrypt(false)}}>
      {props.needSecure ? (
        <Encrypt
          encryptImgSrc={detailSrc}
          encryptString="fribble"
          obvious={true}
        />
      ) : (
        <img src={detailSrc} />
      )}
    </Detail>
  ) : (
    <div className={styles.flatContainer}>
      {flatData?.data?.map((flatImg, index) =>
        props.needSecure ? (
          <div
            className={styles.thumbnailImg}
            key={`${flatData.portfoliolName}${index + 1}`}
            onClick={() => {setDetailSrc(flatImg.imgSrc); setLoadedImgTotal(0); setStartEncrypt(false)}}
          >
            <Encrypt
              encryptImgSrc={flatImg.imgSrc}
              encryptString="fribble"
              onImgLoaded={onImgLoaded}
              startEncrypt={startEncrypt}
              obvious={true}
            />
          </div>
        ) : (
          <div
            className={styles.thumbnailImg}
            key={`${flatData.portfoliolName}${index + 1}`}
            onClick={() => setDetailSrc(flatImg.imgSrc)}
          >
            <img src={flatImg.imgSrc} />
          </div>
        )
      )}
    </div>
  );
};

export default FlatHome;
