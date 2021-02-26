import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Copyright = () => {
  return (
    <div
      style={{ backgroundColor: "black", textAlign: "center", color: "white" }}
    >
      <h3>
        Copyrigth{" "}
        <span>
          {" "}
          <FaRegCopyright />
        </span>{" "}
        Yilmaz Bingol. All rights reserved.{" "}
      </h3>
    </div>
  );
};

export default Copyright;
