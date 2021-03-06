import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Copyright = () => {
  return (
    <div
      style={{
        backgroundColor: "black",
        textAlign: "center",
        color: "white",
        bottom: "0",
        width: "100%",
      }}
    >
      <h4>
        Copyrigth{" "}
        <span>
          {" "}
          <FaRegCopyright />
        </span>{" "}
        Yilmaz Bingol. All rights reserved
      </h4>
    </div>
  );
};

export default Copyright;
