import { Card, CardCustomPropsCreator, CardData } from "../Card";
import styles from "./styles.module.css";

export const DATA_TESTID = "character-card-list";

type Props = {
  cardsData: CardData[];
  card?: CardCustomPropsCreator;
};
export const List = ( { cardsData, card }: Props) => {
  return (
    <section className={styles.main} data-testid={DATA_TESTID}>
      {
        cardsData.map((element) => {
          const cardCustomProps = card?.( {
            data: element,
          } );

          return <Card
            key={element.label}
            data={element}
            href={cardCustomProps?.href}
            favoriteButton={cardCustomProps?.favoriteButton}
          />;
        } )
      }
    </section>
  );
};
