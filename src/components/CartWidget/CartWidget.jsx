import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./CartWidget.module.css";

export default function CartWidget() {
  const { totalUnits } = useContext(CartContext);

  return (
    <Link to="/cart" className={styles.cart}>
      <span className={styles.icon}>🛒</span>

      {totalUnits > 0 && (
        <span className={styles.badge}>{totalUnits}</span>
      )}
    </Link>
  );
}
