import React from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import SpeechBubble from "@/components/SpeechBubble";

const NotFound = () => {
  return (
    <BaseLayout>
      <BasePage>
        <div
          style={{
            marginTop: "10rem",
            textAlign: "center",
          }}
        >
          <img src="/images/404.jpg" alt="not-found" />
          <SpeechBubble>
            <h2>I COULD NOT FIND THE PAGE</h2>
          </SpeechBubble>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default NotFound;
