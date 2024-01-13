export const formatToPrice = (number: number, currency = "UAH") => {
  // en-US - with commas
  // fr-FR - with spaces
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  });
  const price = formatter.format(number);
  return price;
};
