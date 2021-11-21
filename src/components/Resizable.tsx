import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
// resizableBox is preconfigured. allow us to use handles. by default handles has 0 dimension

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  // ResizableBox does not support width=100%. width={Infinity} means take as much horizontal space possible.
  // when state changes, component will rerender, maxConstraint and minConstraint will be updated. so we can always see both code-editor and previrew
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // const [width, setWidth] = useState(window ? window.innerWidth * 0.75 : 0);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  // const [height, setHeight] = useState(window.innerHeight * 0.5);
  console.log("inner", innerHeight);
  let resizableProps: ResizableBoxProps;
  useEffect(() => {
    // we should not update innerHeight and innerWidth frequently. to do so we use debouncing
    let timer: any;
    const listener = () => {
      // this technique is called debouncing
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);
    // whenever we set up a global event listener inside of a component, especially inside useEffect, we always clean up after ourselves.
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      // width: innerWidth * 0.75,
      width: width,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      // this will be called after user finishes resizing the panel.
      onResizeStop: (event, data) => {
        console.log(
          "data inside onResizeStop prop",
          data.size.width,
          data.size.height
        );
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 300],
      // minConstraints: [Infinity, 24],
      // maxConstraints: [Infinity, innerHeight * 0.9],
      // height: 300,
      // width: Infinity,
      // resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
