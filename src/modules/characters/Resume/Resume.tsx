import Image from "next/image";
import styles from "./styles.module.css";
import { CharacterCardData,
  CharacterCardFavButton as FavButton,
  CharacterCardFavButtonCustomProps as FavButtonCustomProps } from "#modules/characters/listing";

type Props = {
  data: CharacterCardData;
  favButton?: FavButtonCustomProps;
};
export const Resume = ( { data, favButton }: Props) => {
  return (
    <section className={styles.main}>
      <aside className={styles.image}>
        {data.urlImage && <Image src={data.urlImage} alt="Character Image" fill priority />}
      </aside>
      <aside className={styles.info}>
        <header className={styles.header}>
          <aside>
            <h1>{data.label}</h1>
          </aside>
          <aside>
            <FavButton initialActive={data.isFavorite} onClick={favButton?.onClick} theme={{
              className: styles.favButton,
            }}/>
          </aside>
        </header>
        <section>
          <p>{data.description}</p>
        </section>
      </aside>
    </section>
  );
};
