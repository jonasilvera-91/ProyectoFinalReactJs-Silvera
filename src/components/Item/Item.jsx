import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

export default function Item({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.imgBox}>
        {!imgLoaded && (
          <div className={styles.imgPlaceholder}>
            Cargando imagen…
          </div>
        )}

        <img
          className={`${styles.img} ${
            imgLoaded ? styles.imgVisible : styles.imgHidden
          }`}
          src={product.img}
          alt={product.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300?text=Sin+imagen";
            setImgLoaded(true);
          }}
        />
      </div>

      <h3 className={styles.title}>
        {product.title || "(sin título)"}
      </h3>

      <p className={styles.price}>${product.price}</p>

      <p className={styles.stock}>
        {product.stock > 0
          ? `Stock: ${product.stock}`
          : "Sin stock"}
      </p>

      <Link className={styles.btn} to={`/item/${product.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}
