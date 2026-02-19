import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string
};

const SearchPage = () => {
    const { city } = useParams();
    const [ searchState, setSearchState ] = useState<SearchState>({
        searchQuery: ""
    })
    const { results, isPending } = useSearchRestaurants(searchState, city);

    if(isPending) {
        <span>Loading...</span>
    }

    if(!results?.data || !city) {
        return <span>No Results Found</span>
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: searchFormData.searchQuery
        }))
    }

    const resetSearch = () => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: ""
        }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                insert cuisines here!
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                 onSubmit={setSearchQuery} 
                 placeholder="Search by cuisine or restaurant name" 
                 onReset={resetSearch}
                 searchQuery={searchState.searchQuery}
                 />
                <SearchResultsInfo city={city} total={results.pagination.total}/>
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>

                ))}
            </div>
        </div>
    );
}

export default SearchPage;
