export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    rating: number;
    categories: string | string[];
}