import React, { useState } from "react";
import { isAuthorized } from "@/utils/auth0";
import ReactResizeDetector from "react-resize-detector";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import AdminMenu from "./AdminMenu";
import { LoginLink, LogoutLink, BsNavBrand, BsNavLink } from "./HeaderLinks";
import { IUser } from "@/types/interfaces";

interface HeaderProps {
  user?: IUser;
  loading?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ user, loading, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    // handlewidth automatically detects the width of the screen. {width} is the current width
    <ReactResizeDetector handleWidth>
      {({ width }: { width: number }) => (
        <Navbar
          className={`port-navbar port-default absolute transparent ${className} ${
            width < 780 && isOpen ? "is-open" : "is-close"
          }`}
          dark
          expand="md"
        >
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/" title="Home" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/about" title="About" />
              </NavItem>
              {/* <NavItem className="port-navbar-item">
                <BsNavLink href="/portfolios" title="Portfolios" />
              </NavItem> */}
              <NavItem className="port-navbar-item">
                <BsNavLink href="/blogs" title="Blogs" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/codepen" title="Codepen" />
              </NavItem>
              {/* <NavItem className="port-navbar-item">
                <BsNavLink href="/secret" title="Secret" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/secretssr" title="SecretSSR" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/onlyadmin" title="Admin" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink href="/onlyadminssr" title="AdminSSR" />
              </NavItem> */}
            </Nav>
            <Nav navbar>
              {!loading && (
                <>
                  {user && (
                    <>
                      {isAuthorized(user, "admin") && <AdminMenu />}
                      <NavItem className="port-navbar-auth">
                        <LogoutLink />
                      </NavItem>
                    </>
                  )}
                  {!user && (
                    <NavItem className="port-navbar-auth">
                      <LoginLink />
                    </NavItem>
                  )}
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      )}
    </ReactResizeDetector>
  );
};

export default Header;
