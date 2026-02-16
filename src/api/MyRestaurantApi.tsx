import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Restaurant } from "@/types";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if(!response.ok) {
            throw new Error("Failed to get restaurant");
        }

        return response.json();
    }
    const {
        data: restaurant,
        isPending,
        error
        } = useQuery({
            queryKey: ["fetchMyRestaurant"],
            queryFn: getMyRestaurantRequest,
        });


    if(error) {
        toast.error(error.toString());
    }

    return { restaurant, isPending };
}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });

        if(!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();

    }

    const { mutate: createRestaurant, isPending, isSuccess, error } = useMutation({mutationFn: createMyUserRequest});

    if(isSuccess) {
        toast.success("Restaurant created!");
    }

    if(error) {
        toast.error("Unable to update the restaurant");
    }

    return { createRestaurant, isPending}
}

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });

        if(!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();

    }

    const { mutate: updateRestaurant, isPending, isSuccess, error } = useMutation({mutationFn: updateRestaurantRequest});

    if(isSuccess) {
        toast.success("Restaurant Updated!");
    }

    if(error) {
        toast.error("Unable to update the restaurant");
    }

    return { updateRestaurant, isPending}
}
