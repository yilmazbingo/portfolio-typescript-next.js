import React, { useState, useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import bundle from "../../bundler";
import dynamic from "next/dynamic";
const Resizable = dynamic(() => import("../Resizable"), { ssr: false });
// import Resizable from "../Resizable";

const initialValue = `import React from 'react'
import ReactDOM from "react-dom"
//component name should be capitalized
const App=()=><h1>Hello World</h1>

ReactDOM.render(<App/>,document.querySelector("#root"))`;

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    // nest time userEffect is called this will be called automatically
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  console.log("code in codecell", code);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "100%",
          // display: "flex",
          // flexDirection: "row",
          marginTop: "calc(3.5vw + 3.5vh)",
          // paddingTop: "1rem",
          // flexWrap: "wrap",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialValue}
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
