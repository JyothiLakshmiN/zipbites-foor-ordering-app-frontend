const Footer = () => {
    return (
        <div className="border-t-orange-500 py-10 bg-orange-600 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="text-3xl font-bold tracking-tighter text-white">ZipBites.com</span>
                <span className="font-bold tracking-tighter text-white gap-4">Privacy Policy</span>

                <div className="mt-4 md:mt-0">
                    <span className="text-white tracking-tighter font-bold text-sm">© 2026 ZipBites. All rights reserved.</span>
                </div>
            </div>
        </div>
    );
}

export default Footer;
