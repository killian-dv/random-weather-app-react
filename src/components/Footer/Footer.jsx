import style from "./style.module.css";
import { ScrollIcon } from "../ScrollIcon/ScrollIcon";

export function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.subtitle}>Glisser pour voyager</p>
      <ScrollIcon />
    </footer>
  );
}
