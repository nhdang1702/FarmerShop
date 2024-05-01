import { CartItem, Product } from "@assets/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

 const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
 });

type CartType = {
    items: CartItem[],
    addItem: (product: Product) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number
}

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product) => {
        const existingItem = items.find(item => item.product == product);

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            quantity: 1

        };
        setItems([newCartItem, ...items]);
    };

    const updateQuantity = (itemId: string , amount: -1 | 1 ) => {
        const updatedItems = items.map((item) => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount}).filter((item) => item.quantity > 0);
        setItems(updatedItems);
    };
    console.log(items);

    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity),0);

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;

export const useCart = () => useContext(CartContext);