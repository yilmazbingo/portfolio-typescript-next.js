import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Copyright = () => {
  return (
    <div
      style={{
        backgroundColor: "#272323",
        textAlign: "center",
        color: "white",
        bottom: "0",
        width: "100%",
        position: "absolute",
        height: "2rem",
      }}
    >
      <h3 style={{ marginTop: "0.75rem" }}>
        Copyrigth{" "}
        <span>
          <FaRegCopyright />
        </span>
        Yilmaz Bingol. All rights reserved
      </h3>
    </div>
  );
};

export default Copyright;
