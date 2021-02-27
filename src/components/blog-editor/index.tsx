import isHotkey, { HotKey, HotKeyOptions } from "is-hotkey";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { Button, Icon, Toolbar } from "./components";
import Constants from "./constants";
import Element from "./Element";
import {
  deserialize,
  isBlockActive,
  isMarkActive,
  serialize,
  toggleBlock,
  toggleMark,
} from "./functions";
import Leaf from "./Leaf";
const HOTKEYS = Constants.HOTKEYS;

interface MyEditorProps {
  loading?: boolean;
  initialContent?: string;
  field?: string;
  title?: string;
  onSave: (data: any) => void;
  setTitleError?: (error: string) => void;
  setFieldError?: (error: string) => void;
  updating?: boolean;
}

const MyEditor: React.FC<MyEditorProps> = ({
  loading,
  initialContent,
  field,
  title,
  onSave,
  setTitleError,
  setFieldError,
  updating,
}) => {
  let initialValue = [
    {
      type: "paragraph",
      children: [{ text: "", bold: false }],
    },
    {
      type: "paragraph",
      children: [{ text: "", bold: false }],
    },
  ];

  const [value, setValue] = useState<any>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (initialContent) {
      const document = new DOMParser().parseFromString(
        initialContent,
        "text/html"
      );
      const deserialized = deserialize(document.body);
      console.log("deserialzied", deserialized);
      if (deserialized && deserialized.length === 1 && deserialized[0].text) {
        deserialized[0].children = [{ ...deserialized[0] }];
        deserialized[0].type = "paragraph";
        // delete deserialized[0].text;
        setValue([...initialValue, ...deserialized]);
      } else {
        setValue(deserialize(document.body));
      }
    }
  }, [initialContent]);

  useEffect(() => {
    // field ? (initialValue[0].children[0].text = field) : "";
    // title ? (initialValue[1].children[0].text = title) : "";
    let parsedTitle, parsedField;
    if (title) {
      parsedTitle = new DOMParser().parseFromString(title, "text/html");
      const deserializedTitle = deserialize(parsedTitle.body);
      initialValue[1].children[0].text = deserializedTitle;
    }
    if (field) {
      parsedField = new DOMParser().parseFromString(field!, "text/html");
      initialValue[0].children[0].text = deserialize(parsedField.body);
    }

    // setValue(initialValue);
  }, [title, field]);

  const save = () => {
    const serialized = serialize({ children: value });
    // const fieldFromUpdate =
    //   (value[0] && value[0].children.map((n) => n.text).join("")) || "";
    // const titleFromUpdate =
    //   (value[1] && value[1].children.map((n) => n.text).join("")) || "";
    if (updating) {
      field =
        (value[0] && value[0].children.map((n: Node) => n.text).join("")) || "";
      title =
        (value[1] && value[1].children.map((n: Node) => n.text).join("")) || "";
    }

    if (!field) setFieldError ? setFieldError("Select a field") : "";
    if (!title) setTitleError ? setTitleError("Write a title") : "";
    if (field && title) {
      onSave({ content: serialized, field, title });
    }
    // else {
    //   onSave({ content: serialized, fieldFromUpdate, titleFromUpdate });
    // }
  };

  return (
    <div className="slate-container">
      {" "}
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            if (
              !loading &&
              event.key === "83" &&
              (event.ctrlKey || event.metaKey)
            ) {
              event.preventDefault();
              save();
            }
            let hotkey: "mod+b" | "mod+i" | "mod+u" | "mod+`";
            for (hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
        <style>
          {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
        </style>
      </Slate>
      <button style={{ marginBottom: "3rem" }} onClick={save}>
        SAVE
      </button>
    </div>
  );
};

const BlockButton = ({ format, icon }: { format: string; icon: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }: { format: string; icon: any }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default MyEditor;
