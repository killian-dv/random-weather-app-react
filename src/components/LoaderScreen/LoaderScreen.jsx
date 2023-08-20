import style from "./style.module.css";
import { LoaderIcon } from "../LoaderIcon/LoaderIcon";

export function LoaderScreen() {
  return (
    <div className={style.wrapper}>
      <LoaderIcon />
      <p className={style.subtitle}>Téléportation en cours...</p>
    </div>
  );
}
