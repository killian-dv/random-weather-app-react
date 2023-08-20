import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import showerRainBlack from "../../assets/images/shower-rain-black.png";
import fewCloudsBlack from "../../assets/images/few-clouds-black.png";
import snowBlack from "../../assets/images/snow-black.png";
import thunderstormBlack from "../../assets/images/thunderstorm-black.png";

const images = [showerRainBlack, fewCloudsBlack, snowBlack, thunderstormBlack];

export function LoaderIcon() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(images.length - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
      setPrevImageIndex(currentImageIndex);
    }, 1400); // 0.4s pause + 1s transition time

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div className={style.container}>
      <div className={style.imageWrapper}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Loader icon ${index}`}
            className={`${style.img} ${
              index === currentImageIndex ? style.active : ""
            } ${index === prevImageIndex ? style.prevActive : ""}`}
            style={{
              animationDelay: `${index * 0.9}s`, // 1.4s = 0.4s + 1s (pause + transition time)
              visibility:
                index === currentImageIndex || index === prevImageIndex
                  ? "visible"
                  : "hidden",
            }}
          />
        ))}
      </div>
    </div>
  );
}
