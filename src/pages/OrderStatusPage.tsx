import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
    const { orders, isPending } = useGetMyOrders();

    if(isPending) {
        return "Loading...";
    }

    if(!orders || orders.length === 0) {
        return "No Orders Found";
    }

    return (
        <div className="space-y-10">
            <p className="flex justify-center text-4xl">Thank you for your order!</p>
            {orders.map((order) => (
                <div className="space-y-10 bg-gray-50 p-2 rounded-lg md:p-10">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2 ">
                        <OrderStatusDetail  order={order}/>
                        <AspectRatio ratio={16/5}>
                            <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderStatusPage;
