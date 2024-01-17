import React from "react";
import { Link } from "react-router-dom";
import useProducts from "../../controllers/ProductController";
import deleteProduct from "../../useCases/DeleteProduct";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const ProductListPage: React.FC = () => {
    const { products, loading, error, fetchData } = useProducts();

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct(productId);
            fetchData();
            toast.success("Produto deletado com sucesso");
        } catch (error) {
            toast.error("Erro ao deletar produto");
        }
    };

    return (
        <div>
            <h1 className="font-medium text-2xl text-center my-4">
                Lista de Produtos
            </h1>
            {products.length > 0 && (
                <>
                    {!loading && !error && (
                        <div className="flex justify-center items-center flex-col max-sm:p-5">
                            <table className="table-auto max-w-7xl">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">ID</th>
                                        <th className="border px-4 py-2">
                                            Título
                                        </th>
                                        <th className="border px-4 py-2">
                                            Preço
                                        </th>
                                        <th className="border px-4 py-2">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="border px-4 py-2">
                                                {product.id}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {product.title}
                                            </td>
                                            <td className="border px-4 py-2">
                                                R$ {product.price}
                                            </td>
                                            <td className="border flex justify-center items-center text-center px-6 py-4">
                                                <Link
                                                    to={`/edit-product/${product.id}`}
                                                >
                                                    <MdModeEdit
                                                        size={24}
                                                        className="text-zinc-600"
                                                    />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    <MdDeleteForever
                                                        size={24}
                                                        className="text-red-500"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {products.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">
                        Ops sua lista de produtos está vazio...
                    </p>
                </div>
            )}
            <div className="flex justify-center items-center flex-col max-sm:p-5">
                <div className="mt-4">
                    <Link
                        to="/new-product"
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Adicionar Novo Produto
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
