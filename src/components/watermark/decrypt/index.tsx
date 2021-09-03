import React, { useState, useEffect, useRef } from "react";

const Decrypt = ({ decryptImgSrc }: { decryptImgSrc: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [imgSize, setImgSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (imgSize.height && imgSize.width) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      let originalImgData: ImageData;
      const decryptImgWatermark = function (originalImgData: ImageData) {
        var data = originalImgData.data;
        for (var i = 0; i < data.length; i++) {
          if (i % 4 == 0) {
            // 红色分量
            if (data[i] % 2 == 0) {
              data[i] = 0;
            } else {
              data[i] = 255;
            }
          } else if (i % 4 == 3) {
            // alpha通道不做处理
            continue;
          } else {
            // 关闭其他分量，不关闭也不影响答案，甚至更美观 o(^▽^)o
            data[i] = 0;
          }
        }
        // 将结果绘制到画布
        ctx.putImageData(originalImgData, 0, 0);
      };
      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        // 获取指定区域的canvas像素信息
        originalImgData = ctx.getImageData(
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height
        );
        decryptImgWatermark(originalImgData);
      };
      img.src = decryptImgSrc;
      img.crossOrigin = "";
    }
  }, [imgSize.width, imgSize.height]);

  return (
    <div>
      {imgSize.width&&imgSize.height?(
        <canvas ref={canvasRef} width={imgSize.width} height={imgSize.height}></canvas>
      ):null}
      <img
        src={decryptImgSrc}
        onLoad={(e) =>
          setImgSize({
            // @ts-ignore
            width: e.target.offsetWidth,
            // @ts-ignore
            height: e.target.offsetHeight,
          })
        }
      />
    </div>
  );
};

export default Decrypt;
