import React from "react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Search = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search"); // Directly go to SearchPage
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-gray-700 focus:ring-0 sm:text-sm"
        placeholder="Search anime..."
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        onClick={handleClick} // Navigate on click
      />
    </div>
  );
};

export default Search;
