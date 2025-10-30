export function formatCurrency(value: string | number, locale: string = "vi-VN") {
  const amount = typeof value === "number" ? value : parseFloat(value ?? "0");
  if (Number.isNaN(amount)) return "Liên hệ";
  return amount.toLocaleString(locale, { style: "currency", currency: "VND", maximumFractionDigits: 0 });
}

export function formatDate(value: Date | string, locale: string = "vi-VN") {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

