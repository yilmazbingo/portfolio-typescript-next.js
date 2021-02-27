import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";
import { createEditor, Node, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { deserialize } from "./functions";
import Element from "./Element";
import Leaf from "./Leaf";
// initialContent comes from db as string
interface SlateViewProps {
  initialContent: string;
}

const ReadOnlyView: React.FC<SlateViewProps> = ({ initialContent }) => {
  // If i did not pass the generic type, I would get "Argument of type 'Node[]' is not assignable to parameter of type 'SetStateAction<never[]>'" because [] would be treated as never[]
  const [value, setValue] = useState<Node[]>([]);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  useEffect(() => {
    if (initialContent) {
      console.log("initial-content", initialContent);
      const document = new DOMParser().parseFromString(
        initialContent,
        "text/html"
      );
      setValue(deserialize(document.body));
      console.log("value", value);
      console.log(document.body);
      // console.log("plain docmnet", Plain(document.body));
    }
  }, [initialContent]);

  return (
    <div>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable
          readOnly
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export default ReadOnlyView;
