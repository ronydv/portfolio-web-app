type Order = {
    userId?: number;
    userName?: string;
    productIds?: Array<number>;
    orderedProducts?: Array<OrderedProduct>;
    total?: number;
};
type OrderedProduct = {
    orderId?:number;
    productName?: string;
    isPending?: boolean;
    orderedAt?: string;
    isChecked?: boolean;
};
type OrderView = {
    orderId?:number;
    userName?:string;
    productName?:string;
    isPending?:boolean;
    isChecked?:boolean;
    orderedAt?:string;
    total?:number;
};