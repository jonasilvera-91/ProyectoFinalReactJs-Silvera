import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

const STORAGE_KEY = "pf_cart";

export function CartProvider({ children }) {
  // 🔹 Cargar carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // 🔹 Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalUnits = useMemo(
    () => cart.reduce((acc, p) => acc + p.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        totalUnits,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
