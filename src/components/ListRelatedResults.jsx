import React from "react";

function ListRelatedResults({
  sectionId,
  sectionHeading,
  onSectionClick,
  onTopSectionClick,
}) {
  const blacklist = [
    "References",
    "External links",
    "Further reading",
    "See also",
    "Notes",
    "Sources",
    "Citations",
  ];

  return (
    <ul className="space-y-1 bg-stone-800 p-4  text-white max-h-[60vh]  select-none">
      <li
        onClick={() => onTopSectionClick(true)}
        className="cursor-pointer px-4 py-2 bg-stone-800 hover:bg-stone-600 active:bg-stone-800 transition-all border-b border-stone-600"
      >
        (Top)
      </li>

      {sectionHeading
        .map((title, index) => ({ title, id: sectionId[index] }))
        .filter(({ title }) => !blacklist.includes(title.trim()))
        .map(({ title, id }, index, filteredArray) => (
          <li
            key={index}
            id={id}
            onClick={() => {
              onSectionClick(index);
              onTopSectionClick(false);
            }}
            className={`cursor-pointer px-4 py-2 bg-stone-800 hover:bg-stone-600  active:bg-stone-800 transition-all ${
              index !== filteredArray.length - 1
                ? "border-b border-stone-600"
                : ""
            }`}
          >
            {title}
          </li>
        ))}
    </ul>
  );
}

export default ListRelatedResults;
