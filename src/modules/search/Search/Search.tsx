import { SearchIcon } from "../../icons/SearchIcon";
import styles from "./Search.module.css";

export const DATA_TESTID = "search-input";

export type OnSearchHandler = (text: string | null)=> void;

export type SearchProps = {
  onSearch?: OnSearchHandler;
  placeholder?: string;
  disabled?: boolean;
};

export const Search = ( { onSearch, placeholder, disabled }: SearchProps) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    return onSearch?.(event.target.value ?? null);
  };

  return (
    <div className={styles.main}>
      <SearchIcon size={12} />
      <input type="search" aria-label="Search" placeholder={placeholder} onChange={onChangeHandler} disabled={disabled} data-testid={DATA_TESTID} />
    </div>
  );
};
