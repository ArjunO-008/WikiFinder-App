import DOMPurify from "dompurify";

const Cleaner = (data) => {
  const purifiedHtml = DOMPurify.sanitize(data);

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = purifiedHtml;

  const tagsToRemove = [
    "img",
    "audio",
    "video",
    "iframe",
    "table",
    "figure",
    "svg",
    "math",
  ];

  tagsToRemove.forEach((tag) => {
    tempDiv.querySelectorAll(tag).forEach((el) => el.remove());
  });

  tempDiv.querySelectorAll("a").forEach((a) => {
    const span = document.createElement("span");
    span.innerHTML = a.innerHTML;
    a.replaceWith(span);
  });

  const cleanedHtml = tempDiv.innerHTML
    .replace(/<a [^>]*>(.*?)<\/a>/gi, "$1")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^\/>]+><\/[^>]+>/gi, "");

  return cleanedHtml;
};

export default Cleaner;
