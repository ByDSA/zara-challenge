import { Favorites } from "./favorites";
import { Logo } from "./logo";
import styles from "./styles.module.css";
import { Themeable, classNames } from "#modules/utils";

type Props = {
  favorites: {
    counter: number;
    onClick?: ()=> void;
    href?: string;
  };
  theme?: Themeable;
};
export const Header = ( { favorites, theme }: Props) => {
  return (
    <header className={classNames(styles.header, theme?.className)}>
      <Logo priority={true}/>
      <Favorites counter={favorites.counter} onClick={favorites.onClick} href={favorites.href}/>
    </header>
  );
};
