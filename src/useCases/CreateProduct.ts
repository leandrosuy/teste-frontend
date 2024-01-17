import axios from "axios";

interface CreateProductInput {
    title: string;
    price: number;
    url_image: string;
    published: boolean;
}

const createProduct = async (input: CreateProductInput): Promise<void> => {
    try {
        await axios.post("http://18.218.128.1:3000/products", input);
    } catch (error) {
        throw new Error("Error creating product");
    }
};

export default createProduct;
