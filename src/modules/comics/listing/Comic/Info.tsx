import styles from "./info.module.css";
type Props = {
  title: string;
  year: number;
};
export const Info = ( { title, year }: Props) => {
  const shownYear = year > 0 ? year : "Unknown";
  const shownTitle = title.trim() || "Unknown";

  return (
    <section className={styles.main}>
      <header className={styles.title}>
        {shownTitle}
      </header>
      <footer className={styles.year}>
        {shownYear}
      </footer>
    </section>
  );
};
