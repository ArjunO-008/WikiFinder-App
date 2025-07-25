import React, { useState } from "react";
import { SearchBar, ViewResult, ListRelatedResults } from "../components/Components";

function SearchLayout() {
  const [pageId, setPageId] = useState(false);
  const [index, setIndex] = useState([]);
  const [headTitle, setHeadTitle] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTopSection, setIsTopSection] = useState(true);
  const [handleView, SetHandleView] = useState(false);
  const [searchError, setSearchError] = useState({
    isError: false,
    message: ``,
  });

  const handlePageId = (id) => {
    setPageId(id);
  };
  const handlePageData = ({ sectionHeading, sectionIndex }) => {
    setHeadTitle(sectionHeading);
    setIndex(sectionIndex);
  };
  const handleSectionClick = (indexId) => {
    setSelectedIndex(indexId);
  };
  const handleTopSectionClick = (isTop) => {
    setIsTopSection(isTop);
  };
  const handleViewRender = (res) => {
    SetHandleView(res);
  };
  const handleSearchError = (err) => {
    if (err) {      
      setSearchError({ isError: err.isError, message: err.message });
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-transparent p-6 transition-all duration-700 ${
          !handleView ? "flex items-center justify-center" : ""
        }`}
      >
        <div
          className={`w-full ${
            !handleView
              ? "max-w-xl"
              : "max-w-7xl mx-auto transition-all duration-700"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out transform ${
              handleView ? "translate-y-0 mb-8" : "translate-y-1/3"
            }`}
          >
            <h1 className="text-3xl font-bold text-lime-500 mb-4">
              WikiFinder
            </h1>
            <div className={`${handleView ? `w-[50%]` : `w-full`}`}>
              <div className="bg-stone-800 shadow rounded-lg border-2 border-lime-500 transition-all duration-700">
                <SearchBar
                  onPageIdFound={handlePageId}
                  onPageDataFound={handlePageData}
                  onHandleView={handleViewRender}
                  onHandleSearchError={handleSearchError}
                />
              </div>
            </div>
          </div>

          {handleView && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 opacity-0 animate-fadeInSlow">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-stone-800 rounded-lg shadow p-4 max-h-[70vh] overflow-y-auto">
                  {
                    <ViewResult
                      pageId={pageId}
                      index={index[selectedIndex]}
                      displayTopSection={isTopSection}
                      isSearchError={searchError}
                    />
               
                  }
                </div>
              </div>

              {pageId && !searchError.isError && (
                <div className="bg-stone-800 rounded-lg shadow p-4 max-h-[80vh] overflow-auto">
                  {pageId && !searchError.isError && (
                    <ListRelatedResults
                      sectionId={index}
                      sectionHeading={headTitle}
                      onSectionClick={handleSectionClick}
                      onTopSectionClick={handleTopSectionClick}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchLayout;
