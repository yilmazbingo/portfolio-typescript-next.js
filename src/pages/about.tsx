import { useEffect } from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { Row, Col, Container } from "reactstrap";
import ErrorHandler from "@/components/ErrorHandler";

declare global {
  interface Window {
    __isAboutLoaded: boolean;
  }
}

const AboutMe = () => {
  const { data, loading } = useGetUser();

  // when user first come to this page, we start the animation but second time it navigates here, we should not do animation again. we set __isAboutLoaded in global object when navigate away from the page
  useEffect(() => {
    return () => {
      window.__isAboutLoaded = true;
    };
  });

  const createFadeInClass = () => {
    // if we user is in browser environment, check the __isAboutLoaded. if it is true, means user visited before so do not apply animation. if it is not true, means this is the first time user is visiting this page.
    if (typeof window !== "undefined") {
      return window.__isAboutLoaded ? "" : "fadein";
    }

    return "fadein";
  };
  // const onHandle = () => setError(null);

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="About - YILMAZ BINGOL" className="about-page">
        <Row className="mt-5">
          {/* <ErrorHandler error={error} onHandle={onHandle}></ErrorHandler> */}
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>
                To About Page
              </h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className={`${createFadeInClass()}`}>
              <h2>
                My three major interests and passions are Computer Science,
                Maths and Finance.
              </h2>
              <h2>
                I have a bachelor degree of Mathematics and Computer Science,
                completed my master in Global Business and Finance from Brooklyn
                College and currently I am an experienced software engineer and
                freelance developer.
              </h2>

              <h2>
                Throughout my career, I have acquired advanced technical
                knowledge and the ability to explain my knowledge clearly and in
                detail to a broad audience. To share my knowledge with the
                world, I decided to create a blogging website.
              </h2>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default AboutMe;
