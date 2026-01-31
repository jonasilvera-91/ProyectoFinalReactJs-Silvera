import Item from "../Item/Item";
import styles from "./ItemList.module.css";

export default function ItemList({ items }) {
  return (
    <section className={styles.grid}>
      {items.map((prod) => (
        <Item key={prod.id} product={prod} />
      ))}
    </section>
  );
}
