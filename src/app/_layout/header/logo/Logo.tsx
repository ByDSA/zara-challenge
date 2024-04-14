import Image from "next/image";
import styles from "./styles.module.css";
import { classNames } from "#modules/utils";

export const url = "/images/logo.svg";

type Props = {
  priority?: boolean;
};
export const Logo = ( { priority }: Props) => {
  return <button className={classNames(styles.link, "focusable")} aria-label="main page" onClick={(e)=> {
    e.preventDefault();
    window.location.href = "/";
  }}><Image src={url} alt="Logo" width={130} height={52} priority={priority} aria-label="Home page button with Marvel logo" /></button>;
};
