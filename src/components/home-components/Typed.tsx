import React from "react";
import Typed from "react-typed";

const TypedAnimation = () => {
  const roles = [
    "Blockchain",
    "Ethereum",
    "Solidity",
    "Next.js",
    "Node.js",
    "React.js",
    "React-Native",
    "Rust",
    "Solana",
    "UX Design",
    "Redux",
    "TypeScript",
    "GraphQL",
    "Python",
    "Microservices",
  ];
  return (
    <Typed
      loop
      typeSpeed={60}
      backSpeed={60}
      strings={roles}
      backDelay={1000}
      loopCount={0}
      showCursor
      className="self-typed"
      cursorChar="|"
    />
  );
};

export default TypedAnimation;
