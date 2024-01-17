import axios from "axios";

interface Product {
    title: string;
    price: number;
    url_image: string;
    published: boolean;
}

const editProduct = async (
    productId: number,
    updatedProduct: Product
): Promise<void> => {
    try {
        await axios.put(
            `http://18.218.128.1:3000/products/${productId}`,
            updatedProduct
        );
    } catch (error) {
        throw new Error("Error editing product");
    }
};

export default editProduct;
