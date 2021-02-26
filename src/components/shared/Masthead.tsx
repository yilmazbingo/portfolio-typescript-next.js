import { Container, Row, Button } from "reactstrap";
import Link from "next/link";

const Masthead: React.FC<{ imagePath?: string; overlay?: true }> = ({
  children,
  imagePath,
  overlay,
}) => (
  <div
    className="masthead"
    style={{
      backgroundImage: `url(${imagePath})`,
    }}
  >
    {/* this makes the image look  */}
    {overlay && <div className="overlay"></div>}
    <Container>
      <Row>
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">{children}</div>
        </div>
      </Row>
    </Container>
  </div>
);

export default Masthead;
