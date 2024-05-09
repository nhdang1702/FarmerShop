import { CartItem, Tables } from "../types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder, useInsertOrder2 } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
type Product = Tables<'products'>;

 const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
    checkout: () => {}
 });

type CartType = {
    items: CartItem[],
    addItem: (product: Product) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number
    checkout: () => void
}

const CartProvider = ({children}: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const router = useRouter();
    const {mutate: insertOrder} = useInsertOrder2();
    const {mutate: insertOrderItems} = useInsertOrderItems();


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

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
          items
            .map((item) =>
              item.id !== itemId
                ? item
                : { ...item, quantity: item.quantity + amount }
            )
            .filter((item) => item.quantity > 0)
        );
      };

    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity),0);

    const clearCart = () => {
        setItems([]);
    };

    const checkout = () => {
        insertOrder(
            {total},
            {
            onSuccess: saveOrderItems,
            }
        );
    };

    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((cartItem) => ({
          order_id: order.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
        }));
    
        insertOrderItems(orderItems, {
          onSuccess() {
            clearCart();
            router.push(`/(user)/orders/${order.id}`);
          },
        });
      };

    return (
        <CartContext.Provider value={{items, addItem, updateQuantity, total, checkout}}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;

export const useCart = () => useContext(CartContext);