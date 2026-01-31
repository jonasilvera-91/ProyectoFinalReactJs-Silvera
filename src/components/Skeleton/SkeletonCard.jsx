import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.line} />
      <div className={styles.lineShort} />
      <div className={styles.btn} />
    </div>
  );
}
