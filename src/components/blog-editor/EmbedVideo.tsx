import React, { ChangeEvent } from "react";
import { Editor, Element as SlateElement, Transforms } from "slate";
import { ReactEditor, useEditor } from "slate-react";
import { ElementProps, UrlInputProps } from "./types";

export const withEmbeds = (editor: Editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "video" ? true : isVoid(element);
  return editor;
};

export const VideoElement: React.FC<ElementProps> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useEditor();
  const { url } = element;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: "75% 0 0 0",
            position: "relative",
          }}
        >
          <iframe
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <UrlInput
          url={url}
          onChange={(val) => {
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<SlateElement> = {
              url: val,
            };
            Transforms.setNodes(editor, newProperties, { at: path });
          }}
        />
      </div>
      {children}
    </div>
  );
};

const UrlInput: React.FC<UrlInputProps> = ({ url, onChange }) => {
  const [value, setValue] = React.useState(url);
  return (
    <input
      value={value as string}
      onClick={(e) => e.stopPropagation()}
      style={{
        marginTop: "5px",
        boxSizing: "border-box",
      }}
      onChange={(e: ChangeEvent) => {
        const element = e.currentTarget as HTMLInputElement;
        const newUrl = element.value;
        setValue(newUrl);
        onChange(newUrl);
      }}
    />
  );
};
