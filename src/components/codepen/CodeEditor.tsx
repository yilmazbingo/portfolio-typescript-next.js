import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
// next dynamic works only on components
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});
let jsxHighlighter: any = null;
import("monaco-jsx-highlighter").then((allMonacoSyntaxHighlighter) => {
  jsxHighlighter = allMonacoSyntaxHighlighter.default;
});

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  // this is our gate into the editor
  const onEditorMount: OnMount = (editor, _monaco) => {
    const babelParse = (code: string) =>
      parse(code, { sourceType: "module", plugins: ["jsx"] });

    editorRef.current = editor;
    editor.onDidChangeModelContent(() => onChange(editor.getValue()));
    editor.getModel()?.updateOptions({ tabSize: 2 });
    const highlighter = new jsxHighlighter(
      // whenever we started to run Monica Editor inside of our browser, it is going to automatically add a property monaco to window.
      //   this means do not type check for the next line of code which is window.monaco
      //@ts-ignore
      window.monaco,
      // codeShift,
      babelParse,
      traverse,
      editor
    );

    // whenver the contents of the editor changes, just try to apply some syntax highligh
    // these args are to make sure those highlight stuff does not console.log errors
    highlighter.highLightOnDidChangeModelContent(100);
  };
  const onFormatClick = () => {
    const unformatted = editorRef.current.getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, ""); // repalce the new line character with ""
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        onMount={onEditorMount}
        theme="vs-dark"
        language="javascript"
        height="100%" // editor will fill up the resizer
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
