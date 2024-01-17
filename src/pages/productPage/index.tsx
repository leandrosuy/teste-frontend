import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import createProduct from "../../useCases/CreateProduct";
import getProductById from "../../useCases/GetProductById";
import editProduct from "../../useCases/EditProduct";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const schema = yup.object().shape({
    title: yup.string().required("Título é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
    url_image: yup
        .string()
        .url("URL da imagem inválida")
        .required("URL da imagem é obrigatória"),
});

type FormData = {
    title: string;
    price: string;
    url_image: string;
    published?: boolean;
};

const ProductPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const [isEditing, setIsEditing] = React.useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await getProductById(Number(id));
                    setValue("title", fetchedProduct.title);
                    setValue("price", fetchedProduct.price.toString());
                    setValue("url_image", fetchedProduct.url_image);
                    setIsEditing(true);
                } catch (error) {
                    toast.error("Erro ao buscar o produto");
                }
            }
        };

        fetchProduct();
    }, [id, setValue]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const numericPrice = parseFloat(data.price);
            if (isEditing) {
                await editProduct(Number(id), {
                    ...data,
                    price: numericPrice,
                    published: true,
                });
            } else {
                await createProduct({
                    ...data,
                    price: numericPrice,
                    published: true,
                });
            }
            toast.success(
                isEditing
                    ? "Produto editado com sucesso"
                    : "Novo produto adicionado com sucesso"
            );
            navigate("/product-list");
        } catch (error) {
            toast.error(
                `${
                    isEditing
                        ? "Erro ao editar o produto"
                        : "Erro ao adicionar novo produto"
                }`
            );
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">
                    {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Título:
                        </label>
                        <input
                            {...register("title")}
                            type="text"
                            id="title"
                            className={`mt-1 p-2 w-full border rounded-md outline-none ${
                                errors.title ? "border-red-500" : ""
                            }`}
                        />
                        <span className="text-red-500">
                            {errors.title?.message}
                        </span>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Preço:
                        </label>
                        <input
                            {...register("price")}
                            type="text"
                            id="price"
                            className={`mt-1 p-2 w-full border rounded-md outline-none ${
                                errors.price ? "border-red-500" : ""
                            }`}
                        />
                        <span className="text-red-500">
                            {errors.price?.message}
                        </span>
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="url_image"
                            className="block text-sm font-medium text-gray-600"
                        >
                            URL da Imagem:
                        </label>
                        <input
                            {...register("url_image")}
                            type="text"
                            id="url_image"
                            className={`mt-1 p-2 w-full border rounded-md outline-none ${
                                errors.url_image ? "border-red-500" : ""
                            }`}
                        />
                        <span className="text-red-500">
                            {errors.url_image?.message}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {isEditing ? "Editar Produto" : "Criar Produto"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductPage;
