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
  const isClickable = !!onClick;
  const ariaLabel = active ? "Remove from favorites" : "Add to favorites";

  return (
    <button className={
      classNames(
        styles.favoriteButton,
        active && styles.isFavorite,
        isClickable && styles.clickable,
        isClickable && "focusable",
        theme?.className,
      )
    } onClick={innerOnClick}
    aria-label={ariaLabel}
    >{favoriteIcon}</button>
  );
};
