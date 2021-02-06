import { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import Typed from "@/components/Typed";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import { useGetUser } from "@/actions/user";

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
      // inside setInterval I have to pass callback to change state
      setIsFlipping((prevFlipping) => !prevFlipping);
    }, 10000);
  };

  return (
    <BaseLayout
      user={data}
      loading={loading}
      navClass="transparent"
      className="home"
    >
      <BasePage indexPage title="Portfolio - Yilmaz Bingol">
        <div className="main-section">
          <Container>
            <Row>
              <Col
                sm="11"
                md={{ size: 6, offset: 3 }}
                className="main-container"
              >
                <SocialMediaLinks />
                <Typed />
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    {/* front of the image */}
                    <div className="front">
                      <div className="image image-1">
                        <div className="hero-section-content">
                          <h2 className="hero-section-frontend">Front End</h2>
                        </div>
                      </div>
                    </div>
                    {/* back of the image */}
                    <div className="back">
                      <div className="image image-2">
                        <div className="hero-section-content">
                          <h2 className="hero-section-backend"> Back End</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2> Software Engineer </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default Index;
