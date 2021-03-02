import React from "react";
import { Container } from "reactstrap";
import HeadTags from "./Head";

interface BasePageProps {
  noWrapper?: boolean;
  indexPage?: boolean;
  className?: string;
  header?: string;
  title?: string;
  metaDescription?: string;
  canonicalPath?: boolean;
}

const PageHeader: React.FC<{ header: string }> = ({ header }) => (
  <h1 className="page-header-title">{header}</h1>
);
const BasePage: React.FC<BasePageProps> = (props) => {
  const {
    indexPage,
    noWrapper,
    className = "",
    header,
    children,
    title,
    metaDescription,
    canonicalPath,
  } = props;
  const Wrapper = noWrapper ? React.Fragment : Container;
  const pageType = indexPage ? "index-page" : "base-page";
  return (
    <>
      <HeadTags
        title={title}
        metaDescription={metaDescription}
        canonicalPath={canonicalPath}
      ></HeadTags>
      <div
        className={`${pageType} ${className}`}
        style={{ display: "flex", flexDirection: "column", flex: "1" }}
      >
        <Wrapper>
          {header && <PageHeader header={header} />}
          {children}
        </Wrapper>
      </div>
    </>
  );
};

export default BasePage;
