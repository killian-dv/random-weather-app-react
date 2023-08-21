import style from "./style.module.css";

import { useState, useEffect } from "react";

export function ScrollIcon() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={style.container}>
      {isDesktop && (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.4853 37.4853L28 26L16.5147 37.4853"
            stroke="#1F3851"
            strokeWidth="2"
          />
          <path
            d="M39.4853 26L28 14.5147L16.5147 26"
            stroke="#1F3851"
            strokeWidth="2"
          />
        </svg>
      )}
      {!isDesktop && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M32.9706 31.9706L24.4853 23.4853L16 31.9706"
            stroke="#1F3851"
            strokeWidth="2"
          />
          <path
            d="M32.9706 23.4853L24.4853 15L16 23.4853"
            stroke="#1F3851"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
}
