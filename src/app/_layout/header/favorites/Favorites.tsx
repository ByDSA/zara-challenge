import { AsideIcon } from "./AsideIcon";
import styles from "./styles.module.css";
import { classNames } from "#modules/utils";

export const DATA_TESTID = "header-favbutton";

type Props = {
  counter: number;
  onClick?: ()=> void;
  href?: string;
};
export const Favorites = ( { counter, onClick, href }: Props) => {
  let asideIcon = AsideIcon( {
    onClick,
    href,
  } );

  return (
    <aside data-testid={DATA_TESTID} className={classNames(styles.favorites)}>
      {asideIcon}
      <aside>{counter}</aside>
    </aside>
  );
};
