import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "reactstrap";

interface BasePage {
  noWrapper?: boolean;
  indexPage?: boolean;
  className?: string;
  header?: string;
  title?: string;
  metaDescription?: string;
  canonicalPath?: boolean;
}

const PageHeader: React.FC<{ header: string }> = ({ header }) => (
  // <div className="page-header">
  <h1 className="page-header-title">{header}</h1>
  // </div>
);
const BasePage: React.FC<BasePage> = (props) => {
  const router = useRouter();
  const {
    indexPage,
    noWrapper,
    className = "",
    header,
    title = "Portfolio - Yilmaz BINGOL",
    metaDescription = "Experienced software engineer and mathematician Yilmaz Bingol",
    canonicalPath,
    children,
  } = props;
  const Wrapper = noWrapper ? React.Fragment : Container;

  const pageType = indexPage ? "index-page" : "base-page";
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* mobile devices by default takes the content from desktop and squueze it. But we want it to be responsive */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* First line of result when somoene searches your page */}
        <meta name="description" key="description" content={metaDescription} />
        <meta name="title" key="title" content={title} />
        <meta property="og:title" key="og:title" content={title} />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta
          property="og:url"
          key="og:url"
          content={`${process.env.BASE_URL}${router.asPath}`}
        />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content={metaDescription}
        />
        <meta
          property="og:image"
          key="og:image"
          content={`${process.env.BASE_URL}/images/frontend.jpeg`}
        />

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico?v=2" />

        <link
          rel="canonical"
          href={`${process.env.BASE_URL}${
            canonicalPath ? canonicalPath : router.asPath
          }`}
        />
        <script
          src="https://kit.fontawesome.com/fbadad80a0.js"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className={`${pageType} ${className}`}>
        <Wrapper>
          {header && <PageHeader header={header} />}
          {children}
        </Wrapper>
      </div>
    </>
  );
};

export default BasePage;
