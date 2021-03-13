import escapeHtml from "escape-html";
import { Editor, Element as SlateElement, Node, Text, Transforms } from "slate";
import { jsx } from "slate-hyperscript";
import Constants from "./constants";

const ELEMENT_TAGS = Constants.ELEMENT_TAGS;
const TEXT_TAGS = Constants.TEXT_TAGS;
const LIST_TYPES = Constants.LIST_TYPES;

const applyTag = (node: Text) => {
  node.text = node.text && escapeHtml(node.text);

  if (node.bold) {
    node.text = `<strong>${node.text}</strong>`;
  }
  if (node.italic) {
    node.text = `<em>${node.text}</em>`;
  }
  if (node.underlined) {
    node.text = `<u>${node.text}</u>`;
  }
  if (node.code) {
    node.text = `<code>${node.text}</code>`;
  }

  return node.text;
};

const serialize = (node: Node): unknown => {
  // this checks if value represents the Text interface
  if (Text.isText(node)) {
    return applyTag({ ...node });
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "link":
      return `<a>${children}</a>`;
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "paragraph":
      return `<p>${children}</p>`;
    default:
      return children;
  }
};

type Deserialize = Node[] | string | null | SlateElement;

// this is desearialize for html
const deserialize = (el: HTMLElement | ChildNode): any | any[] => {
  // nodeType 3 is Text
  if (el.nodeType === 3) {
    return el.textContent;
    // 1 is element
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  type NodeName = keyof typeof ELEMENT_TAGS;
  type TextNodeName = keyof typeof TEXT_TAGS;
  const { nodeName }: { nodeName: NodeName | TextNodeName | string } = el;
  let parent: ChildNode = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
    // console.log("parent", parent);
  }
  // flat(depth) default depth=1
  const children = Array.from(parent.childNodes)
    .map((el) => deserialize(el))
    .flat();
  console.log("children", children);

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName as NodeName]) {
    const attrs = ELEMENT_TAGS[nodeName as NodeName]();
    const _children = children.length === 0 ? [""] : children;
    return jsx("element", attrs, _children);
  }

  if (TEXT_TAGS[nodeName as TextNodeName]) {
    const attrs = TEXT_TAGS[nodeName as TextNodeName]();
    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => {
      // console.log("n inout insdei isBlockActive match", n);
      // console.log("format in isBlockactive", format);
      // console.log("n.type", n.type);
      return (
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
      );
    },
  });

  return !!match;
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  // console.log("is active", isActive);
  // console.log("isList", isList);
  // console.log("editor", editor);

  // Wrap nodes at the specified location in the element container. If no location is specified, wrap the selection.
  Transforms.unwrapNodes(editor, {
    match: (n: Node) =>
      LIST_TYPES.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) as string
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  console.log("marks in isMarkActive", marks);
  return marks ? marks[format] === true : false;
};

export {
  toggleFormat,
  isFormatActive,
  isBlockActive,
  toggleBlock,
  serialize,
  deserialize,
  toggleMark,
  isMarkActive,
};
