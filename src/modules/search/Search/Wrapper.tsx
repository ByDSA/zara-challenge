import { Search, SearchProps } from "./Search";
import styles from "./Wrapper.module.css";

type Props = SearchProps & {
  resultsNumber?: number;
};
export const Wrapper = ( { onSearch,
  placeholder,
  resultsNumber = 0,
  disabled }: Props) => {
  return (
    <main className={styles.main}>
      {Search( {
        onSearch,
        placeholder,
        disabled,
      } )}
      <footer className={styles.footer}>{resultsNumber} {resultsNumber === 1 ? "RESULT" : "RESULTS"}</footer>
    </main>
  );
};
