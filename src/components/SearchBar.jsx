import React, { useState } from "react";
import { wikiApi } from "./Components";
import { FaSearch } from "react-icons/fa";

function SearchBar({
  onPageIdFound,
  onPageDataFound,
  onHandleView,
  onHandleSearchError,
}) {
  const [userQuery, setUserQuery] = useState("");

  const handleSearch = async () => {
    
    if (userQuery.trim() === "" || Number(userQuery)) return;
    try {
      const pageId = await wikiApi.checkWiki(userQuery);
      const pageData = await wikiApi.getPageData(pageId);

      if (pageId && pageData) {
        onPageIdFound(pageId);
        onPageDataFound(pageData);
        onHandleView(true);
        onHandleSearchError({ isError: false, message: `` });
      } else {
        onHandleView(true);
        onHandleSearchError({
          isError: true,
          message: `No Search Result Found...`,
        });
      }
    } catch (error) {
      onHandleView(true);
      onHandleSearchError({
        isError: true,
        message: `Unexpected Error Occured....`,
      });
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className=" flex overflow-hidden w-full h-full">
      <input
        type="text"
        value={userQuery}
        placeholder="Search Wiki....."
        onChange={(e) => setUserQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow px-4 py-2 focus:outline-none text-white placeholder-white w-[95%]"
      />
      <button
        className="bg-lime-500 px-4 flex items-center justify-center hover:bg-lime-600"
        onClick={handleSearch}
      >
        <FaSearch className="text-white" />
      </button>
    </div>
  );
}

export default SearchBar;
