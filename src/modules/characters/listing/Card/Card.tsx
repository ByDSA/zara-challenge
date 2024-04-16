import Image from "next/image";
import cardDetailStyles from "../../card-detail-common.module.css";
import { CharacterData } from "../../model";
import { FavButton, FavButtonCustomProps } from "./FavButton";
import styles from "./styles.module.css";
import { classNames } from "#modules/utils";

export type Data = CharacterData & {
  isFavorite: boolean;
};

type DataProps = {
  data: Data;
};
type CustomProps = {
  href?: string;
  favoriteButton?: FavButtonCustomProps;
};
type Props = CustomProps & DataProps;

export type CustomPropsCreator = (data: DataProps)=> CustomProps;

export const Card = ( { data, favoriteButton, href }: Props) => {
  const image = <Image src={data.urlImage} alt={data.label} fill priority />;
  const photoDiv = <header className={styles.photo}>
    { href ? <a href={href}>{image}</a> : image}
  </header>;
  const info = <footer className={styles.footer}>
    <aside>{data.label}</aside>
    <FavButton
      initialActive={data.isFavorite}
      onClick={favoriteButton?.onClick}
    />
  </footer>;

  return (
    <article className={classNames(styles.main, cardDetailStyles.main, styles.cutEdge)}>
      {photoDiv}
      {info}
    </article>
  );
};
