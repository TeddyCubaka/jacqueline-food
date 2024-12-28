export class FormatModelData {
  product: {
    [key: string]: (
      data: any
    ) => Array<{ label: string; value: string | number }>;
  } = {
    currencyId: (currencies: { [key: string]: any }[]) =>
      currencies.map((currency) => ({
        label: currency.name,
        value: currency.id,
      })),
    productCategoryId: (datas: { [key: string]: any }[]) =>
      datas.map((data) => ({
        label: data.name,
        value: data.id,
      })),
  };

  order: {
    [key: string]: (
      data: any
    ) => Array<{ label: string; value: string | number }>;
  } = {
    currencyId: (currencies: { [key: string]: any }[]) =>
      currencies.map((currency) => ({
        label: currency.name,
        value: currency.id,
      })),
    clientId: (datas: { [key: string]: any }[]) =>
      datas.map((data) => ({
        label: data.fullName,
        value: data.id,
      })),
  };

  booking: {
    [key: string]: (
      data: any
    ) => Array<{ label: string; value: string | number }>;
  } = {
    clientId: (datas: { [key: string]: any }[]) =>
      datas.map((data) => ({
        label: data.fullName,
        value: data.id,
      })),
  };
}
