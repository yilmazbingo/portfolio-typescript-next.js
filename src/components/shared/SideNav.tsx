import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { TiSocialYoutubeCircular } from "react-icons/ti";

const SideNav = () => {
  return (
    <aside className="side-nav">
      <div className="side-nav content">
        <div className="side-nav content logo">
          <img src="/images/logo.jpg" alt="logo" />
        </div>
        <div className="side-nav content icons">
          <a
            target="_blank"
            className="side-nav content icons github"
            href="https://github.com/yilmazbingo/portfolio-typescript-next.js"
          >
            <AiFillGithub />
          </a>
          <a
            target="_blank"
            className="side-nav content icons stackoverflow"
            href="https://stackoverflow.com/users/10262805/yilmaz"
          >
            <FaStackOverflow />
          </a>
          {/* <a
            target="_blank"
            className="side-nav content icons linkedin"
            href="https://www.linkedin.com/in/yilmaz-bingol-8b52a961/"
          >
            <FaLinkedinIn />
          </a> */}
          <a
            target="_blank"
            className="side-nav content icons twitter"
            href="https://twitter.com/bingolyilmazNy"
          >
            <FiTwitter />
          </a>
          <a
            target="_blank"
            className="side-nav content icons youtube"
            href="https://www.youtube.com/channel/UCiWhssryq8kgsFwFB5NrWSQ"
          >
            <TiSocialYoutubeCircular />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
