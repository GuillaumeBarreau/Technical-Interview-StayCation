import { TProductCardText } from "../../ProductCard.types";
import styles from "./ProductCardText.module.scss";

const ProductCardText = (props: TProductCardText) => {
  const { children, fontSize = "medium", color } = props;

  if (!children) {
    return null;
  }

  const textStyle = {
    color: color ? color : "inherit",
  };

  return (
    <div
      className={`${styles.productCardText} ${
        styles[`productCardText--${fontSize}`]
      }`}
    >
      <span className={styles.productCardTitleHeading} style={textStyle}>
        {children}
      </span>
    </div>
  );
};

export default ProductCardText;
