import styles from "./styles.module.css";
import { HeartIconSelected } from "#modules/icons/HeartIconSelected";
import { classNames } from "#modules/utils";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>)=> void;
  href?: string;
};
export const AsideIcon = ( { href, onClick }: Props) => {
  const icon = <HeartIconSelected />;

  if (!onClick && href) {
    onClick = (e) => {
      e.preventDefault();
      window.location.href = href;
    };
  }

  if (onClick) {
    return <button className={classNames(styles.iconPointer, "focusable")} aria-label="Favorite button" onClick={onClick}>{icon}
    </button>;
  } else
    return <aside>{icon}</aside>;
};
