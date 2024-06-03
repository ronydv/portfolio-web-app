type Order = {
    userId?:number;
    userName?:string;
    productIds?:Array<number>;
    orderedProducts?:Array<OrderedProduct>;
}
type OrderedProduct={
     productName?:string;
     isPending?:boolean;
     orderedAt?:string;
}