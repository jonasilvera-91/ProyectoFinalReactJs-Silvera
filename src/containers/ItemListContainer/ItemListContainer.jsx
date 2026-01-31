import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import ItemList from "../../components/ItemList/ItemList";

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
      <main style={{ padding: 16 }}>
        <h1>{categoryId ? `Categoría: ${categoryId}` : "Catálogo"}</h1>
        <p>Cargando productos...</p>
      </main>
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
