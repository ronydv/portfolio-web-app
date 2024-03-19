/* used in ProductDashboard.tsx */
type Product = {
    id?: number;
    brand?:string;
    name?: string;
    price?: number;
    quantity?: number;
    addedAt?: string;
    status?: boolean;
    description?:string;
    categories?: Array<Category>;
};
type Category = {
    id?: number;
    name?: string;
};