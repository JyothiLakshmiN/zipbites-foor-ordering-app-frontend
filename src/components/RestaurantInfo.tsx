import type { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant
}

const RestaurantInfo = ({restaurant}: Props) => {
    return (
        <div>
            <Card className="border-sla">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight">{restaurant.restaurantName}</CardTitle>
                    <CardDescription>{restaurant.city} , {restaurant.country}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap">
                    {restaurant.cuisines.map((item, idx) => (
                        <span className="flex">
                            <span>{item}</span>
                            {idx < restaurant.cuisines.length - 1 && <Dot />}
                        </span>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default RestaurantInfo;
