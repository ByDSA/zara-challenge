import Image from "next/image";
import { ComicData } from "../../model";
import { Info } from "./Info";
import styles from "./styles.module.css";

type Props = {
  data: ComicData;
};
export const Comic = ( { data }: Props) => {
  return (
    <article className={styles.main}>
      <section>
        <Image src={data.urlImage} alt={data.title} width={179.2} height={268.8} />
      </section>
      <Info title={data.title} year={data.year} />
    </article>
  );
};
