import { ComicData } from "../model";
import { Comic } from "./Comic";
import styles from "./styles.module.css";

type Props = {
  data: ComicData[];
};
export const ComicsList = ( { data }: Props) => {
  return (
    <section className={styles.main}>
      {
        data.map((element) => {
          return <Comic
            key={element.id}
            data={element}
          />;
        } )
      }
    </section>
  );
};
