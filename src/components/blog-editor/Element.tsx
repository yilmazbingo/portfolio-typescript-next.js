import React from "react";
import { VideoElement } from "./EmbedVideo";
import { ElementProps } from "./types";

const Element: React.FC<ElementProps> = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "link":
      return (
        <a {...attributes} href={element.url as string}>
          {children}
        </a>
      );
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "video":
      return <VideoElement {...props} />;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
