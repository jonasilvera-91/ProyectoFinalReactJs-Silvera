import styles from "./ItemDetail.module.css";
import { formatPrice } from "../../utils/format";

export default function ItemDetail({ product, children }) {

   console.log("PRICE RAW:", product?.price, typeof product?.price);
   
  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.imgBox}>
          <img className={styles.img} src={product.img} alt={product.title} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.desc}>{product.description}</p>

          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.stock}>
            {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
          </p>

          {/* Acá vamos a insertar ItemCount luego */}
          <div className={styles.actions}>{children}</div>
        </div>
      </div>
    </main>
  );
  
}
