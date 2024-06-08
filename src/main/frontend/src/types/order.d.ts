type Order = {
    userId?:number;
    userName?:string;
    productIds?:Array<number>;
    orderedProducts?:Array<OrderedProduct>;
    total?:number
}
type OrderedProduct={
     productName?:string;
     isPending?:boolean;
     orderedAt?:string;
     isChecked?:boolean;
}