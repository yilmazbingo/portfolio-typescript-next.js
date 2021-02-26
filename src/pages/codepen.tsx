import CodeCell from "@/components/codepen/CodeCell";
import React from "react";
import BasePage from "@/components/BasePage";
import Header from "@/components/shared/Header";

const Codepen = () => {
  return (
    <BasePage
      noWrapper
      className="codepen-page"
      title="jsx codepen yilmaz bingol"
      metaDescription="react codepen by Yilmaz Bingol"
    >
      <Header className="with-bg" />
      <CodeCell />
    </BasePage>
  );
};

export default Codepen;
