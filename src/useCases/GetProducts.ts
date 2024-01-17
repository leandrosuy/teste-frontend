import axios from "axios";
import Product from "../entities/Product";

const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get("http://18.218.128.1:3000/products");
        return response.data;
    } catch (error) {
        throw new Error("Error fetching products");
    }
};

export default getProducts;
