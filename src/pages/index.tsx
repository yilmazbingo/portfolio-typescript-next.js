import React, { useEffect, useRef, useState, RefObject } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useGetUser } from "@/actions/user";
import BasePage from "@/components/layout/BasePage";
import ContactForm from "@/components/home-components/ContactForm";
import BaseLayout from "@/components/layout/BaseLayout";
import ShowCase from "@/components/home-components/ShowCase";
import Skills from "@/components/home-components/Skills";
import Typed from "@/components/home-components/Typed";
import FloadingBoxAnime from "@/components/FloadingBoxesAnim";
import FeaturedPosts from "@/components/home-components/FeaturedPosts";
import { getFeaturedPosts } from "@/helpers/markdownBlogs";
import { IBlog } from "@/types/interfaces";

const Index: React.FC<{ posts: IBlog[] }> = ({ posts }) => {
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
  return (
    <BaseLayout user={data} loading={loading} className="home-layout">
      {/* <FloadingBoxAnime /> */}
      <BasePage
        className="home"
        indexPage
        title="Portfolio - Yilmaz Bingol"
        noWrapper
      >
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
                  <h1 className="frontend">Front End</h1>
                </div>
              </div>
              <div className="back">
                <div className="image image-2">
                  <h1 className="backend"> Back End</h1>
                </div>
              </div>
            </div>
          </div>
          <ShowCase />
        </section>
        <FeaturedPosts posts={posts} />
        <Skills />
        <ContactForm />
      </BasePage>
    </BaseLayout>
  );
};

export default Index;

export async function getStaticProps() {
  const posts = getFeaturedPosts();

  return { props: { posts } };
}
