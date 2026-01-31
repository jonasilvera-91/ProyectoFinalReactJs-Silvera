export const formatPrice = (value) => {
  // convierte " $1.600 " o "1600" a número
  const cleaned = String(value ?? "")
    .replace(/[^\d]/g, ""); // deja solo números

  const number = Number(cleaned);

  if (!cleaned || Number.isNaN(number)) return String(value ?? "");

  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(number);
};
