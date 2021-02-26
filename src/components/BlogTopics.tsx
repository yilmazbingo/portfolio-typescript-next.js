import React from "react";
import Link from "next/link";
import { FaReact, FaNodeJs, FaPython, FaAngular } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiNodeRed } from "react-icons/si";

const BlogTopics = () => {
  return (
    <section id="services">
      <Link href="blogs/javascript">
        <div className="service clickable">
          <span className="js-icon">
            <IoLogoJavascript />
          </span>
          <h3 className="services--title ">JavaScript</h3>
        </div>
      </Link>
      <Link href="blogs/python">
        <div className="service clickable">
          <span className="py-icon">
            <FaPython />
          </span>

          <h3 className="services--title services__service-2--title">Python</h3>
        </div>
      </Link>

      <Link href="blogs/blockchain">
        <div className="service clickable">
          <span className="blockchain-icon">
            <SiNodeRed />
          </span>
          <h3 className="services--title services__service-3--title">
            Blockchain
          </h3>
        </div>
      </Link>
      <Link href="blogs/nodejs">
        <div className="service clickable">
          <span className="node-icon">
            <FaNodeJs />
          </span>

          <h3 className="services--title ">Node Js</h3>
        </div>
      </Link>

      <Link href="blogs/react">
        <div className="service clickable">
          <span className="react-icon">
            <FaReact />
          </span>
          <h3 className="services--title ">React Js</h3>
        </div>
      </Link>
      <Link href="blogs/angular">
        <div className="service services__service-6 clickable">
          <span className="angular-icon">
            <FaAngular />
          </span>
          <h3 className="services--title services__service-6--title">
            Angular
          </h3>
        </div>
      </Link>
    </section>
  );
};

export default BlogTopics;
