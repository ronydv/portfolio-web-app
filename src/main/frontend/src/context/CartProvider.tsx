import { createContext, useEffect, useState } from "react";
/*
The wrapping is done in index.tsx
This provider is filled in ProductCard.tsx, and used in Catalog.tsx to save items in the cart
*/
export type CartItemContext ={
    items:Product[];
    setItems: React.Dispatch<React.SetStateAction<Product[]>>;
}
const CartContext = createContext<CartItemContext | undefined>(undefined);

export const CartProvider = ({children}:ContextProps) => {
    const [items, setItems]=useState<Product[]>(JSON.parse(localStorage.getItem("cart-item")!) || []);

    //store the item whenever the item is modified in any component that utilizes CartContext
    useEffect(()=>localStorage.setItem('cart-item',JSON.stringify(items)),[items]);
    return ( 
        <CartContext.Provider value={{items,setItems}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartContext;