import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

type LayoutProps = {
    children: React.ReactNode;
    showHero?: boolean;
}
const Layout = ({ children, showHero = false }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}
            <div className="container mx-auto flex-1 py-10 px-4">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
