
import landingimage from "../assets/landing.png";
import appdownloadImage from "../assets/appDownload.png"
import SearchBar, {type  SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
const Homepage = () => {

    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600 ">Tuck into a takeway today</h1>
                <span className="text-xl">Food is just a click away!</span>
                <SearchBar placeholder="Search by city or town" onSubmit={handleSearchSubmit}/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingimage} alt="Landing" className="rounded-lg shadow-md" />
                <div className="flex flex-col items-center gap-4 justify-center text-center">
                    <span className="font-bold text-3xl tracking-tighter">Order takeaway even faster!</span>
                    <span className="">Download the MernEats App for faster ordering and personalised recommendations</span>
                    <img src={appdownloadImage} alt="App Download" className="w-48 mt-4" />
                </div>
            </div>
        </div>
    );
}

export default Homepage;
