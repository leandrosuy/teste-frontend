import axios from "axios";

const deleteProduct = async (productId: number): Promise<void> => {
    try {
        await axios.delete(`http://18.218.128.1:3000/products/${productId}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Erro ao deletar um produto");
        } else {
            throw new Error("Ocorreu um erro desconhecido.");
        }
    }
};

export default deleteProduct;
