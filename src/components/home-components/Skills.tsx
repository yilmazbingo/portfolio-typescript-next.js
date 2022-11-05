import React from "react";

const Skills = () => {
  return (
    <section id="skills">
      <div className="skills__coding">
        <h3 className="skills__coding title">SKILLS</h3>

        <h4>HTML / CSS / SCSS</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__html"></span>
        </div>

        <h4>JavaScript</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__js"></span>
        </div>
        <h4>Typescript</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__js"></span>
        </div>
        <h4>Next.js</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__next"></span>
        </div>

        <h4>React</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__react"></span>
        </div>
      </div>

      <div className="skills__coding">
        <h3 className="skills__coding title"></h3>

        <h4>Node.js</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__node"></span>
        </div>

        <h4>Python</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__python"></span>
        </div>

        <h4>GraphQL</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__graphql"></span>
        </div>

        <h4>Rust/Solana</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__db"></span>
        </div>
        <h4>Solidity</h4>
        <div className="skills__coding--progress">
          <span className="skills__coding--progress__solidity"></span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
