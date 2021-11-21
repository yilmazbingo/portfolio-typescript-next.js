const ELEMENT_TAGS = {
  BLOCKQUOTE: () => ({ type: "block-quote" }),
  H1: () => ({ type: "heading-one" }),
  H2: () => ({ type: "heading-two" }),
  LI: () => ({ type: "list-item" }),
  UL: () => ({ type: "bulleted-list" }),
  OL: () => ({ type: "numbered-list" }),
  P: () => ({ type: "paragraph" }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  EM: () => ({ italic: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underlined: true }),
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export default { ELEMENT_TAGS, TEXT_TAGS, HOTKEYS, LIST_TYPES };
