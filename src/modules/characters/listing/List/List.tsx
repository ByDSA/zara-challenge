import { Card, CardCustomPropsCreator, CardData } from "../Card";
import styles from "./styles.module.css";
import { Themeable, classNames } from "#modules/utils";

export const DATA_TESTID = "character-card-list";

type Props = {
  cardsData: CardData[];
  theme?: Themeable;
  card?: CardCustomPropsCreator;
};
export const List = ( { cardsData, theme, card }: Props) => {
  return (
    <section className={classNames(styles.main, theme?.className)} data-testid={DATA_TESTID}>
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
