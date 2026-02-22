import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemComponent from "@/components/MenuItem";
import OrderSummery from "@/components/OrderSummery";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import type { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number
}

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isPending } = useGetRestaurant(restaurantId);
    const { createCheckoutSession, isPending: isCheckoutSessionLoading } = useCreateCheckoutSession();

    const [ cartItems, setcartItems ] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);

        return storedCartItems ? JSON.parse(storedCartItems) : []
    });

    const  addTocart = (menuItem: MenuItem) => {
        setcartItems((prev) => {
            //Check if item is alreadyin cart
            const existingCartItem = prev.find((item) => item._id == menuItem._id);

            let updatedCartItems;

            if(existingCartItem) {
                updatedCartItems = prev.map((cartItem) => cartItem._id == menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
            } else {
                updatedCartItems = [
                    ...prev,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        setcartItems((prev) => {
            const updatedCartItems = prev.filter(item => item._id !== cartItem._id);

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        })
    }

    const onCheckout = async (userFormData: UserFormData) => {
        console.log('userFormData', userFormData);
        if(!restaurant) {
            return;
        }
    
        const checkoutdata = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            restaurantId: restaurant._id,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email as string
            }
        };

        const data = await createCheckoutSession(checkoutdata);
        window.location.href = data.url;

    }

    if(isPending || !restaurant) {
        return <>Loading...</>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (<MenuItemComponent menuItem={menuItem} addToCart={()=> addTocart(menuItem)}/>))}
                </div>
                <div className="">
                    <Card>
                        <OrderSummery restaurant={restaurant} cartItems={cartItems}
                        removeFromCart={removeFromCart}/>
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length == 0} 
                                onCheckout={onCheckout}
                                isLoading={isCheckoutSessionLoading}
                                />
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    );
}

export default DetailPage;
