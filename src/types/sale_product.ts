export interface Sale_product {
    productId: number,
    productName: string,
    productDesc: string,
    quota: number,
    price: number
}

export enum SaleProductEnum {
    SUCCESS = "0000",
    NeedLogin = "0003",
}