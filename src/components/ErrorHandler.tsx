import React, { Fragment } from "react";
import dynamic from "next/dynamic";

const Backdrop = dynamic(() => import("./Backdrop"), { ssr: false });
const Modal = dynamic(() => import("./Modal"), { ssr: false });

interface ErrorHandlerProps {
  error?: any;
  onHandle: () => void;
  acceptEnabled?: boolean;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = (props) => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title="An Error Occurred"
        onCancelModal={props.onHandle}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p>{props.error}</p>
      </Modal>
    )}
  </Fragment>
);

export default ErrorHandler;
