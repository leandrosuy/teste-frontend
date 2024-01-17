import useProducts from "../../controllers/ProductController";
import CardProduct from "../../components/CardProduct";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import Search from "../../components/Search";
import SortFilter from "../../components/Filter";

interface Product {
    id: number;
    title: string;
    price: number;
    createdAt: string;
    url_image: string;
}

interface CartProps {
    id: number;
    title: string;
    price: number;
    url_image: string;
    amount: number;
    total: number;
}

export function Home() {
    const { products } = useProducts();
    const { addItemCard } = useContext(CartContext);
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(products);
    const [sortOption, setSortOption] = useState<string | null>(null);

    function handleAddCartItem(product: Product) {
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
    }

    const handleSearch = (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(lowercaseQuery)
        );
        applySorting(filtered);
    };

    const applySorting = (data: Product[]) => {
        console.log(data)
        if (sortOption === "order") {
            data.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "price") {
            data.sort((a, b) => a.price - b.price);
        } else if (sortOption === "date") {
            data.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            );
        }

        setFilteredProducts([...data]);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSortOption((prevSortOption) => {
            if (prevSortOption === selectedOption) {
                return null;
            } else {
                return selectedOption;
            }
        });
    };

    useEffect(() => {
        const applySortingAndSetState = (data: Product[]) => {
            if (sortOption === "order") {
                data.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === "price") {
                data.sort((a, b) => a.price - b.price);
            } else if (sortOption === "date") {
                data.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            }

            setFilteredProducts([...data]);
        };

        applySortingAndSetState(products);
    }, [sortOption, products]);

    return (
        <div>
            <main className="w-full max-w-7xl px-4 py-10 mx-auto">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
                    Produtos em alta
                </h1>

                <div className="flex items-center justify-between my-5 max-md:flex-col">
                    <Search onSearch={handleSearch} />
                    <SortFilter onSortChange={handleSortChange} />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {filteredProducts.length === 0 ? (
                        <p>Nenhum produto encontrado.</p>
                    ) : (
                        filteredProducts.map((product) => (
                            <CardProduct
                                image={product.url_image}
                                title={product.title}
                                price={product.price}
                                key={product.id}
                                id={product.id}
                                action={() => handleAddCartItem(product)}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
