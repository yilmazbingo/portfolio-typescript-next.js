import React, { useEffect, useRef, useState, RefObject } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import ContactForm from "@/components/ContactForm";
import BaseLayout from "@/components/layout/BaseLayout";
import ShowCase from "@/components/ShowCase";
import Skills from "@/components/Skills";
import Typed from "@/components/Typed";
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
  const { width, height, ref } = useResizeDetector();
  console.log("width", width);
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

        <section
          className="hero-section"
          ref={
            ref as
              | string
              | ((instance: HTMLElement | null) => void)
              | RefObject<HTMLElement>
              | null
              | undefined
          }
        >
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
