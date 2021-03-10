import React from "react";
import Typed from "react-typed";

const TypedAnimation = () => {
  const roles = [
    "Blockchain",
    "Next.js",
    "Node.js",
    "Nest.js",
    "React.js",
    "React-Native",
    "Angular",
    "Rx.js",
    "Redux",
    "NgRx",
    "Webpack",
    "EsBuild",
    "TypeScript",
    "GraphQL",
    "Python",
    "Flask",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Firebase",
    "Mongo DB",
    "Docker",
    "Kubernetes",
    "AWS",
    "SCSS",
    "SEO",
  ];
  return (
    <Typed
      style={{ fontFamily: "PressStart2P" }}
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
