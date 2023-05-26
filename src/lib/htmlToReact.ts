import { createElement } from "react";
export default function HTMLToReact(htmlString: string) {
  return createElement("div", {
    dangerouslySetInnerHTML: { __html: htmlString },
  });
}
