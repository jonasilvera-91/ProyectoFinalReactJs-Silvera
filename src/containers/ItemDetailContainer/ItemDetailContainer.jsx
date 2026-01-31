import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../services/firebase";
import ItemDetail from "../../components/ItemDetail/ItemDetail";
import ItemCount from "../../components/ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";

export default function ItemDetailContainer() {
  const { itemId } = useParams();

  const { addItem } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Para ocultar ItemCount luego de agregar
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setAdded(false); // si cambio de producto, vuelve a mostrar el contador

    const docRef = doc(db, "products", itemId);

    getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          setNotFound(true);
          setProduct(null);
          return;
        }

        setProduct({
          id: snapshot.id,
          ...snapshot.data(),
        });
      })
      .catch((err) => {
        console.error("Firestore error:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  const handleAdd = (quantity) => {
    // Guarda el producto en el carrito global
    addItem(product, quantity);
    // Oculta el contador y muestra "Ir al carrito"
    setAdded(true);
  };

  if (loading) {
    return (
      <main style={{ padding: 16 }}>
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (notFound || !product) {
    return (
      <main style={{ padding: 16 }}>
        <h1>Producto no encontrado</h1>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <ItemDetail product={product}>
      {!added ? (
        <ItemCount
          stock={product.stock}
          initial={1}
          onAdd={handleAdd}
        />
      ) : (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/cart">Ir al carrito</Link>
          <Link to="/">Seguir comprando</Link>
        </div>
      )}
    </ItemDetail>
  );
}
