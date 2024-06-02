import { useContext } from "react";
import CartContext, { CartItemContext } from "../../context/CartProvider";

const Cart = () => {
    const cartContext=useContext<CartItemContext | undefined>(CartContext);
    
    return ( 
        <div>
            {cartContext?.item.map((product,i)=>{
                return <p key={i}>{product.name}</p>
            })}
        </div>
     );
}
 
export default Cart;