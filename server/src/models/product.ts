export interface Product {
  name: string;
  description: string;
  price: string;
  pictureUrl: string;
  productType: ProductType;
  productBrand: ProductBrand;
}
export interface ProductType {
  name: string;
}

interface ProductBrand {
  name: string;
}
