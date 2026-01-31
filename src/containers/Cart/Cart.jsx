import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, removeItem, clearCart, totalUnits, totalPrice } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <main className={styles.wrapper}>
        <h1>Carrito vacío</h1>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <h1>Carrito</h1>

      <div className={styles.list}>
        {cart.map((p) => (
          <article className={styles.item} key={p.id}>
            <img className={styles.img} src={p.img} alt={p.title} />

            <div className={styles.info}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.muted}>Precio: ${p.price}</p>
              <p className={styles.muted}>Cantidad: {p.quantity}</p>
              <p className={styles.subtotal}>
                Subtotal: ${p.price * p.quantity}
              </p>

              <button
                className={styles.remove}
                onClick={() => removeItem(p.id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.summary}>
        <p>
          <strong>Total unidades:</strong> {totalUnits}
        </p>
        <p>
          <strong>Total:</strong> ${totalPrice}
        </p>

        <div className={styles.actions}>
          <button className={styles.clear} onClick={clearCart}>
            Vaciar carrito
          </button>

          <Link className={styles.checkout} to="/checkout">
            Ir a checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
