import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// import "./Backdrop.css";

interface BacdropProps {
  open?: string;
  onClick: () => void;
}

const Backdrop: React.FC<BacdropProps> = (props) => {
  //   if (typeof window !== "undefined") {
  //     const rootContainer = document.createElement("div");
  //     const parentElem = document.querySelector("#__next");

  //     // parentElem?.insertAdjacentElement("afterend", parentElem);
  //     parentElem?.after(rootContainer);

  //     container = rootContainer;
  //   }

  //   return container
  //     ? ReactDOM.createPortal(
  //         <div
  //           className={["backdrop", props.open ? "open" : ""].join(" ")}
  //           onClick={props.onClick}
  //         />,
  //         container
  //       )
  //     : null;

  // this return MutableRefObject not read only current
  let containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Will be execute once in client-side
    const rootContainer = document.createElement("div");
    const parentElem = document.querySelector("#__next");
    parentElem?.insertAdjacentElement("afterend", rootContainer);
    // parentElem?.after(rootContainer) this gives me same issue
    containerRef.current = rootContainer;
  }, []);
  return containerRef.current
    ? ReactDOM.createPortal(
        <div
          className={["backdrop", props.open ? "open" : ""].join(" ")}
          onClick={props.onClick}
        />,
        containerRef.current
      )
    : null;
  // let l = null;
  // useEffect(() => {
  //   // Will be execute once when containerRef is bind to <HTMLDivElement>
  //   if (containerRef.current) {
  //     l = ReactDOM.createPortal(
  //       <div
  //         className={["backdrop", props.open ? "open" : ""].join(" ")}
  //         onClick={props.onClick}
  //       />,
  //       containerRef.current
  //     );
  //   }
  // }, [containerRef]);
  // return l;
};

export default Backdrop;
