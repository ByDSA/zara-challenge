import styles from "./styles.module.css";
import { Themeable, classNames } from "#modules/utils";

type Props = {
  theme?: Themeable & {
    innerDiv: Themeable;
  };
  children: React.ReactNode;
};
export const FixedWidthContent = ( { children, theme }: Props) => {
  return <div className={classNames(styles.wrapper, theme?.className)}>
    <div className={classNames(styles.content, theme?.innerDiv?.className)}>
      {children}
    </div>
  </div>;
};
