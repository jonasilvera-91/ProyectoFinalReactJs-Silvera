import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import ItemList from "../../components/ItemList/ItemList";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";

export default function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, "products");
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      })
      .catch((err) => {
        console.error("Firestore error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, padding: 16 }}>
      {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

  if (items.length === 0) {
    return (
      <main style={{ padding: 16 }}>
        <h1>{categoryId ? `Categoría: ${categoryId}` : "Catálogo"}</h1>
        <p>No hay productos para mostrar.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>{categoryId ? `Categoría: ${categoryId}` : "Catálogo"}</h1>

      <ItemList items={items} />
    </main>
  );
}
