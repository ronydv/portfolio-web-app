import { createContext, useState } from "react";
/*
The wrapping is done in index.tsx
This provider is filled in ProductCard.tsx, and used in Header.tsx to save items in the cart
*/
export type CartItemContext ={
    item:number;
    setItem: React.Dispatch<React.SetStateAction<number>>;
}
const CartContext = createContext<CartItemContext | undefined>(undefined);

export const CartProvider = ({children}:ContextProps) => {
    const [item, setItem]=useState<number>(parseInt(localStorage.getItem("cart-item")!) || 0);
    return ( 
        <CartContext.Provider value={{item,setItem}}>
            {children}
        </CartContext.Provider>
     );
}
 
export default CartContext;