import styles from './Typography.module.scss';
import { ITypography } from './Typography.types';

const Typography = (props: ITypography) => {
  const { children, fontSize = 'medium' } = props;

  if (!children) {
    return null;
  }

  return <span className={`${styles.TypographyWrapper} ${styles[`Typography--${fontSize}`]}`}>{children}</span>;
};

export default Typography;
