
const currencySymbols: { [key: string]: string } = {
  BRL: "R$",
  USD: "US$",
  EUR: "€",
  GBP: "£",
};

export function currencyFormatter(value: number, currency: string) {
  const locale = currency === "BRL" ? "pt-BR" : "en-US";
  const symbol = currencySymbols[currency] || "";
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);

  const formattedNumber = new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(absoluteValue);

  return isNegative
    ? `-${symbol} ${formattedNumber}`
    : `${symbol} ${formattedNumber}`;
}