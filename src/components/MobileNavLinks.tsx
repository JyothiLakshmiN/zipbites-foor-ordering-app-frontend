import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const { logout } = useAuth0();
    return (
        <>
            <Link to="/order-status" className="bg-white flex hover:bg-orange-500 hover:text-white font-bold px-4 py-2 rounded-md w-full text-center">
                Order Status
            </Link>
            <Link to="/manage-restaurant" className="bg-white flex hover:bg-orange-500 hover:text-white font-bold px-4 py-2 rounded-md w-full text-center">
                My Restaurant
            </Link>
            <Link to="/user-profile" className="bg-white flex hover:bg-orange-500 hover:text-white font-bold px-4 py-2 rounded-md w-full text-center">
                User Profile
            </Link>
            <Button
                className="flex flex-1 font-bold bg-orange-500"
                onClick={() => logout()}
                >
                Log Out
            </Button>
        </>
    );
}

export default MobileNavLinks;
