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

export default Product;
