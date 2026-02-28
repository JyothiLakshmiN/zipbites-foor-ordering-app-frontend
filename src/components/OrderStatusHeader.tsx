import type { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order
}

const OrderStatusHeader = ({ order }: Props) => {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);
        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();

        const paddedMinuites = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinuites}`;

    };


    const getOrderStatusInfo = () => {
        return ORDER_STATUS.find((o) => o.value == order.status) || ORDER_STATUS[0];
    }

    return (
        <>
            <h1 className="md:text-2xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                <span>
                    Order Status: 
                    {getOrderStatusInfo().value == "delivered" ? <span className="text-green-500 text-1xl">{getOrderStatusInfo().label}</span> : 
                    <span className="text-orange-500 text-1xl">{getOrderStatusInfo().label}</span>}
                    
                </span>
               <span>
                {getOrderStatusInfo().value == "delivered" 
                    ? <span className="text-green-500">Delivered</span> 
                    : <>Expected by: <span className="text-orange-500">{getExpectedDelivery()}</span></>
                }
            </span>
            </h1>
            <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue}/>
        </>
    );
}

export default OrderStatusHeader;
