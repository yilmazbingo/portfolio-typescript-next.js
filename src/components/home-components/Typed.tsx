import React from "react";
import Typed from "react-typed";

const TypedAnimation = () => {
  const roles = [
    "Blockchain",
    "Ethereum",
    "Solidity",
    "Next.js",
    "Node.js",
    "Nest.js",
    "React.js",
    "React-Native",
    "Kotlin",
    "Angular",
    "UX Design",
    "Rx.js",
    "Redux",
    "NgRx",
    "Webpack",
    "EsBuild",
    "TypeScript",
    "GraphQL",
    "Python",
    "Django",
    "Flask",
    "C#",
    "Unity 3D",
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
    "Git",
    "Asana",
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
