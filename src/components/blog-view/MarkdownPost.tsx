import React, { ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Content } from "mdast";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("py", python);

import vscDarkPlus from "react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus";
import { Container, Row, Col } from "reactstrap";

import { IBlog } from "@/types/interfaces";

interface PostContent {
  blog: IBlog;
}

type NodeToProps<T> = {
  node: T;
  children: T extends { children: any } ? ReactNode : never;
};

type CustomRenderers = {
  [K in Content["type"]]?: (
    props: NodeToProps<Extract<Content, { type: K }>>
  ) => ReactElement;
};
// next Image component is wrapped with some other elements so it gives me this errorr:react-dom.development.js?61bb:88 Warning: Expected server HTML to contain a matching <div> in <p>. because markdown is translated into html such that all content is treated as paragraph, including images. Instead of overriding the image, we can look at all <p>.
const PostContent: React.FC<PostContent> = ({ blog }) => {
  const customRenderers: CustomRenderers = {
    paragraph(paragraph) {
      const { node } = paragraph;
      if (node.children[0].type === "image") {
        const image = node.children[0];
        return (
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              // maxWidth: "60rem",
              width: "90%",
              marginBottom: "3rem",
              backgroundColor: "white",
              color: "white",
            }}
          >
            <Image
              src={`/images/posts/${image.url}`}
              alt={image.alt}
              width={30}
              height={15}
              layout="responsive"
            />
          </div>
        );
      }
      return <p> {paragraph.children} </p>;
    },
    code(code) {
      const { node } = code;
      const { lang, value } = node;
      return (
        <div style={{ fontSize: "1.6rem" }}>
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={lang}
            children={value}
          />
        </div>
      );
    },
  };

  return (
    <Container>
      <Row>
        <Col>
          <article style={{ paddingLeft: "2rem" }}>
            <ReactMarkdown
              renderers={customRenderers as any}
              className="markdown-paragraph"
            >
              {blog.content}
            </ReactMarkdown>
          </article>
        </Col>
      </Row>
    </Container>
  );
};

export default PostContent;
