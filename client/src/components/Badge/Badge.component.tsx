import { IBadge } from "./Badge.types";
import styles from "./Badge.module.scss";

const Badge = (props: IBadge) => {
  const { children } = props;
  return <span className={styles.badgeWrapper}>{children}</span>;
};

export default Badge;
