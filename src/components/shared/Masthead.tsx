import { Container, Row, Button } from "reactstrap";
import Link from "next/link";

const Masthead: React.FC<{
  imagePath?: string;
  overlay?: true;
  backgroundColor?: string;
}> = ({ children, imagePath, overlay, backgroundColor }) => (
  <div
    className="masthead"
    style={{
      backgroundImage: `url(${imagePath})`,
      backgroundColor: `${backgroundColor}`,
    }}
  >
    {/* this makes the image look  */}
    {overlay && <div className="overlay"></div>}

    <div className="site-heading">{children}</div>
  </div>
);

export default Masthead;
