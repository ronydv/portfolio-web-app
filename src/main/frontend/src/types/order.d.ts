type Order = {
    userId?: number;
    userName?: string;
    productIds?: Array<number>;
    orderedProducts?: Array<OrderedProduct>;
    total?: number;
};
type OrderedProduct = {
    productName?: string;
    isPending?: boolean;
    orderedAt?: string;
    isChecked?: boolean;
};
type OrderView = {
    userName?:string;
    productName?:string;
    isPending?:boolean;
    isChecked?:boolean;
    orderedAt?:string;
    total?:number;
};