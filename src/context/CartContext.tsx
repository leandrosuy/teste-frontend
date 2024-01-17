import { ReactNode, createContext, useEffect, useLayoutEffect, useState } from "react";

interface CartProps {
    id: number;
    title: string;
    price: number;
    url_image: string;
    amount: number;
    total: number;
}

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCard: (newItem: CartProps) => void;
    removeItemCart: (produc: CartProps) => void;
    clearCart: () => void;
    total: string;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    function addItemCard(newItem: CartProps) {
        const indexItem = cart.findIndex((item) => item.id === newItem.id);
        if (indexItem !== -1) {
            const cartList = [...cart];
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total =
                cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const data = {
            ...newItem,
            amount: 1,
            total: newItem.price,
        };

        setCart((products) => [...products, data]);
        totalResultCart([...cart, data]);
    }

    function removeItemCart(product: CartProps) {
        const indexItem = cart.findIndex((item) => item.id === product.id);
        if (cart[indexItem]?.amount > 1) {
            const cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total =
                cartList[indexItem].total - cartList[indexItem].price;
            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter((item) => item.id !== product.id);
        setCart(removeItem);
        totalResultCart(removeItem);
    }

    function totalResultCart(item: CartProps[]) {
        const myCart = item;
        const result = myCart.reduce((acc, obj) => {
            return acc + obj.total;
        }, 0);
        const resultFormat = result.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        setTotal(resultFormat);

        return resultFormat;
    }

    useLayoutEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    function clearCart() {
        setCart([]);
        setTotal("");
        localStorage.removeItem("cart");
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                cartAmount: cart.length,
                addItemCard,
                removeItemCart,
                clearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
