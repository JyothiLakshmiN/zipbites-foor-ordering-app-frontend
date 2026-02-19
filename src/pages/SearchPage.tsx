import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();
    const [ searchState, setSearchState ] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    },)

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isPending } = useSearchRestaurants(searchState, city);

    const setSortOption = (sortOption: string) => {
        setSearchState((prev) => ({...prev, sortOption, page: 1}))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prev) => ({
            ...prev,
            selectedCuisines,
            page: 1
        }))
    };

    if(isPending) {
        <span>Loading...</span>
    }

    if(!results?.data || !city) {
        return <span>No Results Found</span>
    }

    const setPage = (page: number) => {
        setSearchState((prev) => ({
            ...prev,
            page,
        }))
    }
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))
    }

    const resetSearch = () => {
        setSearchState((prev) => ({
            ...prev,
            searchQuery: "",
            page: 1
        }))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter 
                    selectedCuisines={searchState.selectedCuisines} 
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prev) => !prev)}
                    />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                 onSubmit={setSearchQuery} 
                 placeholder="Search by cuisine or restaurant name" 
                 onReset={resetSearch}
                 searchQuery={searchState.searchQuery}
                 />
                 <div className="flex justify-between gap-3 flex-col lg:flex-row">
                    <SearchResultsInfo city={city} total={results.pagination.total}/>
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)}/>
                 </div>
                
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant}/>

                ))}
                <PaginationSelector 
                    page={results.pagination.page} 
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                    />
            </div>
        </div>
    );
}

export default SearchPage;
