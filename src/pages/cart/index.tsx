import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Cart() {
    const { cart, addItemCard, removeItemCart, clearCart, total } =
        useContext(CartContext);

    const handleClearCart = () => {
        clearCart();
        toast.success("Compra finalizada com sucesso");
    };
    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">
                Meu carrinho
            </h1>

            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Ops seu carrinho está vazio...
                    </p>
                    <Link
                        to="/"
                        className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"
                    >
                        Acessar produtos
                    </Link>
                </div>
            )}

            {cart.map((item) => (
                <section
                    key={item.id}
                    className="flex items-center justify-between border-b-2 border-gray-300"
                >
                    <img
                        src={item.url_image}
                        alt={item.title}
                        className="w-28"
                    />

                    <strong>Preço: R$ {item.price}</strong>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => removeItemCart(item)}
                            className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                        >
                            -
                        </button>
                        {item.amount}
                        <button
                            onClick={() => addItemCard(item)}
                            className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>

                    <strong className="float-right">
                        SubTotal: R$ {item.total}
                    </strong>
                </section>
            ))}

            {cart.length !== 0 && (
                <div className="w-full flex justify-between">
                    <p className="font-bold mt-4">Total: {total}</p>
                    <div className="mt-4">
                        <button
                            className="bg-green-500 text-white p-2 rounded"
                            onClick={handleClearCart}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
