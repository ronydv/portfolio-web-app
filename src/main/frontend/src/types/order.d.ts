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
    orderId?: number;
    userName?: string;
    productName?: string;
    isPending?: boolean;
    isChecked?: boolean;
    orderedAt?: string;
    total?: number;
};
type OrderStatus = {/* used in the analytics component pie chart and in account/Orders.tsx */
    totalOrders?: number;
    uncheckedOrders?: number;
    dataForStatistics?: Array<OrderStatusDataName>
};
type OrderStatusDataName={
    dataName:string;
    value:number;
}
type OrderCount={
    productName?:string;
    value?:number;
}
type MonthlyOrders={
    amount:number;
}