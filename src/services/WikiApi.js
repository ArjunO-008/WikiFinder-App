const checkWiki = async (userQuery) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        userQuery
      )}&format=json&origin=*`
    );
    const data = await response.json();
    if (data?.query?.search[0]?.pageid && data?.query?.search.length > 0) {
      return data.query.search[0].pageid;
    }
    return false;
  } catch (error) {
    throw new error(`Unexpected Error Occured.....`);
    return false;
  }
};

const getPageData = async (pageId) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=parse&pageid=${pageId}&prop=sections&format=json&origin=*`
    );
    const data = await response.json();
    if (data?.parse?.sections) {
      const pageSections = data.parse.sections;
      const featuredSections = pageSections.filter(
        (section) => section.toclevel == 1
      );
      const sectionHeading = featuredSections.map((title) => title.line);
      const sectionIndex = featuredSections.map((section) => section.index);

      return { sectionHeading, sectionIndex };
    }
    return false;
  } catch (error) {
    throw new error(`Can't Get The Article....`);
    return false;
  }
};

export default {
  checkWiki,
  getPageData,
};
