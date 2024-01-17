import { useState, useEffect } from "react";
import getProducts from "../useCases/GetProducts";
import Product from "../entities/Product";

const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const result = await getProducts();
            setProducts(result);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocorreu um erro desconhecido.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { products, loading, error, fetchData };
};

export default useProducts;
