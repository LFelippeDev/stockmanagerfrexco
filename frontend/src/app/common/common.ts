export const id = localStorage.StockId;
export const token = {
  headers: {
  authorization: localStorage.Token,
}}

export const logo= 'https://frexco.com.br/wp-content/uploads/2020/04/logo-frexco-slogan.png'
export const whiteLogo=  "https://loja.frexco.com.br/og.png?050220"
export type ProductsType = {
  _id: string;
  name: string;
  inStock: number;
};

export type StocksType = {
  _id: string;
  name: string;
  product: ProductsType[];
};
