/* used in ProductDashboard.tsx */
type Product = {
    id?: number;
    name?: string;
    description?:string;
    categories?: Array<Category>;
    images?:Array<Image>;
    sector?:String
};
type Category = {
    id?: number;
    name?: string;
};
type Image = {
    id?: number;
    url: string;
    name: string;
};
type Sector={
    name:string;
}