import React from "react";

interface SortFilterProps {
    onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortChange }) => {
    return (
        <div className="w-1/4 ml-3 max-md:w-full max-md:ml-0">
            <select
                id="countries"
                className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4"
                onChange={onSortChange}
            >
                <option value="default">Filtrar por</option>
                <option value="order">Ordem alfabética</option>
                <option value="price">Preço</option>
                <option value="date">Data</option>
            </select>
        </div>
    );
};

export default SortFilter;
