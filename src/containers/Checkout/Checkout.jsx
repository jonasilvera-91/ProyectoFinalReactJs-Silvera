import { useContext, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { db } from "../../services/firebase";
import styles from "./Checkout.module.css";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBuyer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!buyer.name || !buyer.phone || !buyer.email) {
      setError("Completá todos los campos.");
      return;
    }

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    setLoading(true);

    try {
      const order = {
        buyer,
        items: cart.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          quantity: p.quantity,
        })),
        total: totalPrice,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);

      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al generar la orden.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Carrito vacío + sin orden
  if (cart.length === 0 && !orderId) {
    return (
      <main className={styles.wrapper}>
        <h1>Checkout</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  // ✅ Orden generada
  if (orderId) {
    return (
      <main className={styles.wrapper}>
        <h1>¡Compra confirmada!</h1>
        <p>
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <h1>Checkout</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre
          <input
            className={styles.input}
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Teléfono
          <input
            className={styles.input}
            type="text"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
          />
        </label>

        <p className={styles.total}>
          Total: <strong>${totalPrice}</strong>
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btn} disabled={loading}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </main>
  );
}
