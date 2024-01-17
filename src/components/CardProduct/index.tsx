import React from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

interface CardProductProps {
    id: number;
    image: string;
    title: string;
    price: number;
    action: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({
    image,
    title,
    price,
    id,
    action,
}) => {
    return (
        <section className="w-full">
            <Link to={`/product/${id}`}>
                <img
                    className="w-full rounded-lg max-h-70 mb-2"
                    src={image}
                    alt={`Imagem de ${title}`}
                />
                <p className="font-medium mt-1 mb-2">{title}</p>
            </Link>

            <div className="flex gap-3 items-center">
                <strong className="text-zinc-700/90">R$ {price}</strong>
                <button
                    className="bg-zinc-900 p-1 rounded"
                    onClick={() => action()}
                >
                    <BsCartPlus size={20} color="#FFF" />
                </button>
            </div>
        </section>
    );
};

export default CardProduct;
