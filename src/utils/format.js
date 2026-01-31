export const formatPrice = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return value; // por si viene raro desde Firebase
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(number);
};
