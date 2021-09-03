import React, { useState, useEffect, useRef } from "react";

const Encrypt = ({
  encryptImgSrc,
  encryptString,
  onImgLoaded,
  startEncrypt,
  obvious = false,
}: {
  encryptImgSrc: string;
  encryptString: string;
  onImgLoaded?: any;
  startEncrypt?: boolean;
  obvious: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const imgRef = useRef<HTMLImageElement>();
  const [imgSize, setImgSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const [selfStartEncrypt, setSelfStartEncrypt] = useState<boolean>(false);

  const mergeStr2Img = ({
    outputCanvas,
    strData,
    imgData,
    color,
  }: {
    outputCanvas: CanvasRenderingContext2D;
    strData: Uint8ClampedArray;
    imgData: ImageData;
    color: string;
  }) => {
    const dataOfImgData = imgData.data;
    let bit, offset;

    switch (color) {
      case "R":
        bit = 0;
        offset = 3;
        break;
      case "G":
        bit = 1;
        offset = 2;
        break;
      case "B":
        bit = 2;
        offset = 1;
        break;
    }

    for (var i = 0; i < dataOfImgData.length; i++) {
      if (i % 4 == bit) {
        // 只处理目标通道
        if (strData[i + offset] === 0 && dataOfImgData[i] % 2 === 1) {
          // 没有信息的像素，该通道最低位置0，但不要越界
          if (dataOfImgData[i] === 255) {
            dataOfImgData[i] -= 1;
          } else {
            dataOfImgData[i] += 1;
          }
        } else if (strData[i + offset] !== 0 && dataOfImgData[i] % 2 === 0) {
          // 有信息的像素，该通道最低位置1
          dataOfImgData[i] += 1;
        }
      }
    }
    outputCanvas.putImageData(imgData, 0, 0);
  };

  const getStrLength = (str: string) =>
    str.split("").reduce((total, prev: string) => {
      if (prev.charCodeAt(0) > 127 || prev.charCodeAt(0) == 94) total += 2;
      else total += 1;
      return total;
    }, 0);

  useEffect(() => {
    console.log(imgSize);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      let strData: ImageData;
      ctx.font = "30px Microsoft Yahei";
      ctx.fillText(encryptString, 60, 130);
      strData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      let imgData: ImageData;

      img.onload = function () {
        ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        // 获取指定区域的canvas像素信息
        imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (obvious) {
          ctx.font = "15px Microsoft Yahei";
          ctx.fillText(
            encryptString,
            ctx.canvas.width - getStrLength(encryptString) * 7.5 - 20,
            ctx.canvas.height - 10
          );
        } else {
          mergeStr2Img({
            outputCanvas: ctx,
            strData: strData.data,
            imgData,
            color: "R",
          });
        }
      };
      img.src = encryptImgSrc;
      img.crossOrigin = "";
    }
  }, [imgSize]);

  useEffect(() => {
    if (selfStartEncrypt || startEncrypt) {
      setImgSize({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, [startEncrypt, selfStartEncrypt]);

  return (
    <div>
      {imgSize.height && imgSize.width ? null : (
        <img
          ref={imgRef}
          onLoad={() => {
            if (onImgLoaded) onImgLoaded();
            else setTimeout(() => setSelfStartEncrypt(true), 100);
          }}
          src={encryptImgSrc}
          alt=""
        ></img>
      )}
      {imgSize.height && imgSize.width ? (
        <canvas
          ref={canvasRef}
          width={imgSize.width}
          height={imgSize.height}
        ></canvas>
      ) : null}
    </div>
  );
};

export default Encrypt;
