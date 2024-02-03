// {
//   number: number;
//   currency: string | null;
//   symbolType: string | null;
// }
type IArgs = {
  currency?: string | undefined;
  symbolType?: string | undefined;
};

export const formatToPrice = (number: number, args?: IArgs) => {
  let curr = "UAH";
  let symb = "code";
  if (args) {
    const { currency, symbolType } = args;
    curr = currency ? currency : "UAH";
    symb = symbolType ? symbolType : "code";
  }
  // todo - update logic
  // todo -  add feature - without kopiyku
  // todo - use number to get '.' instead of ','

  // todo - add better typing

  // code
  // symbol
  // narrowSymbol
  // name

  // en-US - with commas
  // fr-FR - with spaces
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: curr,
    currencyDisplay: symb,
  });
  const price = formatter.format(number);

  return price;
};
