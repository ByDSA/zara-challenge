"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { HeartIconSelected } from "#modules/icons/HeartIconSelected";
import { HeartIconUnselected } from "#modules/icons/HeartIconUnselected";
import { Themeable, classNames } from "#modules/utils";

type OnClickProps = {
  newActiveValue: boolean;
  event: React.MouseEvent;
};

type FavButtonOnClick = (props: OnClickProps)=> void;
export type FavButtonCustomProps = {
  onClick?: FavButtonOnClick;
};
type Props = FavButtonCustomProps & {
  initialActive: boolean;
  theme?: Themeable;
};

export const FavButton = ( { initialActive, onClick, theme }: Props) => {
  const [active, setActive] = useState(initialActive);
  const favoriteIcon = active
    ? <HeartIconSelected />
    : <HeartIconUnselected />;

  useEffect(() => {
    setActive(initialActive);
  }, [initialActive]);
  const innerOnClick = onClick && ((e: React.MouseEvent) => {
    setActive(value=>{
      const newValue = !value;

      onClick?.( {
        newActiveValue: newValue,
        event: e,
      } );

      return newValue;
    } );
  } );

  return (
    <aside className={
      classNames(
        styles.favoriteIcon,
        active && styles.isFavorite,
        !!onClick && styles.clickable,
        theme?.className,
      )
    } onClick={innerOnClick}
    >{favoriteIcon}</aside>
  );
};
