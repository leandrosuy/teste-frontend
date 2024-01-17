import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProductById from "../../useCases/GetProductById";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

interface Product {
    id: number;
    title: string;
    price: number;
    url_image: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    authorId: number | null;
}

interface CartProps {
    id: number;
    title: string;
    price: number;
    url_image: string;
    amount: number;
    total: number;
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const { addItemCard } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductById = async () => {
            const productData = await getProductById(Number(id));
            setProduct(productData);
        };
        fetchProductById();
    }, [id]);

    function handleAddItem(product: Product | null) {
        if (product) {
            const cartItem: CartProps = {
                id: product.id,
                title: product.title,
                price: product.price,
                url_image: product.url_image,
                amount: 1,
                total: product.price,
            };

            toast.success("Produto adicionado no carrinho");
            addItemCard(cartItem);
            navigate("/cart");
        }
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto my-6">
                {product && (
                    <section className="w-full">
                        <div className="flex flex-col">
                            <img
                                className="flex-1 w-full max-h-96 object-contain"
                                src={product?.url_image}
                                alt={product?.title}
                            />
                            <div className="flex-1">
                                <p className="font-bold text-2xl mt-4 mb-2">
                                    {product?.title}
                                </p>
                                <p className="my-4">{product?.title}</p>
                            </div>
                            <div>
                                <strong className="text-zinc-700/90 text-xl mr-5">
                                    R$
                                    {product.price}
                                </strong>
                                <button
                                    className="bg-zinc-900 p-1 rounded"
                                    onClick={() => handleAddItem(product)}
                                >
                                    <BsCartPlus size={20} color="#FFF" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
