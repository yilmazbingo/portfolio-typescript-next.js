import React from "react";

const SpeechBubble: React.FC<{}> = (props) => {
  const { children } = props;
  return <div className="speech">{children}</div>;
};

export default SpeechBubble;
