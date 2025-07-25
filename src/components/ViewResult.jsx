import React, { useEffect, useRef, useState } from "react";
import Cleaner from "../services/CleanHtml";

function ViewResult({ pageId, index, displayTopSection, isSearchError }) {
  const [error, setError] = useState(null);
  const [article, setArticle] = useState("");
  const prevPageId = useRef(null);

  const getTopSectionData = async () => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts&exintro&format=json&origin=*`
      );
      const data = await response.json();

      if (data.query && data.query.pages[`${pageId}`]) {
        const cleanedHtml = Cleaner(data.query.pages[`${pageId}`].extract);
        setArticle(cleanedHtml);
      } else {
        setArticle(`SomeThing Went Wrong....`);
      }
    } catch (error) {
      setError(`No Section Data Founds.....`);
    }
  };

  const getSectionData = async () => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&section=${index}&prop=text&format=json&origin=*`
      );
      const data = await response.json();

      if (data.parse && data.parse.text) {
        const cleanedHtml = Cleaner(data.parse.text["*"]);

        setArticle(cleanedHtml);
      } else {
        setArticle(`SomeThing Went Wrong....`);
      }
    } catch (error) {
      setError(`No Section Data Founds.....`);
    }
  };

  useEffect(() => {
    setError(null);

    if (isSearchError.isError) {
      setError(`${isSearchError.message}`);

      return;
    }

    if (displayTopSection || pageId !== prevPageId.current) {
      getTopSectionData();
      prevPageId.current = pageId;
    } else {
      getSectionData();
    }
  }, [pageId, index, displayTopSection, isSearchError]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-stone-800 text-white rounded-lg shadow-inner  max-h-full">
      {error ? (
        <p className="text-stone-200 font-semibold">{error}</p>
      ) : (
        <div
          className="wiki-content  max-w-none  "
          dangerouslySetInnerHTML={{ __html: article }}
        />
      )}
    </div>
  );
}

export default ViewResult;
