export const formatPrice = (value) => {
  const number = Number(value);

  // Si por algún motivo viene vacío o raro, devolvemos el mismo value
  if (Number.isNaN(number)) return String(value ?? "");

  // Esto devuelve: "UYU 1.600"
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(number);
};
