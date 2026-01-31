import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito (si existe, suma cantidad)
  const addItem = (item, quantity) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  // Remover un producto
  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Total de unidades
  const totalUnits = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity, 0),
    [cart]
  );

  // Total $
  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity * p.price, 0),
    [cart]
  );

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    totalUnits,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
