import axios from "axios";

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

const getProductById = async (productId: number): Promise<Product> => {
    try {
        const response = await axios.get(
            `http://18.218.128.1:3000/products/${productId}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Error getting product by ID");
    }
};

export default getProductById;
