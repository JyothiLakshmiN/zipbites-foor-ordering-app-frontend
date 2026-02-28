import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
const MobileNav = () => {
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? <span className="font-bold flex items-center gap-2">
                        <CircleUserRound className="text-orange-500" size={20} />
                        {user?.name}
                    </span> : <span>Welcome to ZipBites.com!</span>}
                </SheetTitle>
                <Separator className="my-4"/>
                <SheetDescription className="flex flex-col gap-1">
                    {isAuthenticated ? <MobileNavLinks /> : 
                    <Button
                        className="flex-1 font-bold bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => loginWithRedirect()}
                        >Log In</Button>
                    }
                    
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;
