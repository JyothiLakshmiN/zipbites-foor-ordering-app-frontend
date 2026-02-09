export type User = {
    _id: string;
    name: string;
    email: string;
    country?: string;
    city?: string;
    addressLine1?: string;
};

export type FoodItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};
