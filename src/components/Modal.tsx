import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "reactstrap";
// import './Modal.css';

interface ModalProps {
  onCancelModal: () => void;
  onAcceptModal: () => void;
  acceptEnabled: boolean;
  isLoading?: boolean;
  title: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  // let container: HTMLDivElement | null = null;
  let containerRef = useRef<HTMLDivElement | null>(null);
  console.log("container", containerRef);
  useEffect(() => {
    const rootContainer = document.createElement("div");
    rootContainer.className = "modall";
    const parentElem = document.querySelector("#__next");
    // parentElem?.insertAdjacentElement("afterend", parentElem);
    // parentElem?.before(rootContainer);
    parentElem?.insertAdjacentElement("afterend", rootContainer);
    if (!containerRef.current) {
      containerRef.current = rootContainer;
    }

    console.log("containerREf in modal", containerRef.current);
    return () => rootContainer.remove();
  }, [containerRef]);
  // useEffect(() => {
  //   containerRef.current
  //     ? ReactDOM.createPortal(
  //         // <div className="modal">
  //         <>
  //           <header className="modal__header">
  //             <h1>{props.title}</h1>
  //           </header>
  //           <div className="modal__content">{props.children}</div>
  //           <div className="modal__actions">
  //             <Button design="danger" mode="flat" onClick={props.onCancelModal}>
  //               Cancel
  //             </Button>
  //             <Button
  //               mode="raised"
  //               onClick={props.onAcceptModal}
  //               disabled={!props.acceptEnabled}
  //               loading={props.isLoading}
  //             >
  //               Accept
  //             </Button>
  //           </div>
  //           {/* </div>, */}
  //         </>,
  //         containerRef.current
  //       )
  //     : null;
  // });
  return containerRef.current
    ? ReactDOM.createPortal(
        // <div className="modal">
        <>
          <header className="modal__header">
            <h1>{props.title}</h1>
          </header>
          <div className="modal__content">{props.children}</div>
          <div className="modal__actions">
            <Button design="danger" mode="flat" onClick={props.onCancelModal}>
              Cancel
            </Button>
            <Button
              mode="raised"
              onClick={props.onAcceptModal}
              disabled={!props.acceptEnabled}
              loading={props.isLoading}
            >
              Accept
            </Button>
          </div>
          {/* </div>, */}
        </>,
        containerRef.current
      )
    : null;
  // return null;
};

export default Modal;
