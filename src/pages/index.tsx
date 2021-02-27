import { useGetUser } from "@/actions/user";
import BasePage from "@/components/BasePage";
import ContactForm from "@/components/ContactForm";
import BaseLayout from "@/components/layouts/BaseLayout";
import ShowCase from "@/components/ShowCase";
import Skills from "@/components/Skills";
import Typed from "@/components/Typed";
import React, { useEffect, useRef, useState } from "react";
import FloadingBoxAnime from "@/components/FloadingBoxesAnim";

const Index = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, loading } = useGetUser();
  // if our component rerendered for some reason flipInterval.current will be untouched
  let flipInterval = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((prevFlipping) => !prevFlipping);
    }, 10000);
  };

  return (
    <BaseLayout user={data} loading={loading} className="home-layout">
      {/* <FloadingBoxAnime /> */}
      <BasePage
        className="home"
        indexPage
        title="Portfolio - Yilmaz Bingol"
        noWrapper
      >
        {/* <FloadingBoxAnime /> */}

        <section className="hero-section">
          <Typed />
          <div className="rotating-image">
            <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
              <div className="front">
                <div className="image image-1">
                  <h2 className="frontend">Front End</h2>
                </div>
              </div>
              <div className="back">
                <div className="image image-2">
                  <h2 className="backend"> Back End</h2>
                </div>
              </div>
            </div>
          </div>
          <ShowCase />
        </section>
        <Skills />
        <ContactForm />
      </BasePage>
    </BaseLayout>
  );
};

export default Index;
