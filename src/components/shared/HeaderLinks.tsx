import Link from "next/link";
import { UrlObject } from "url";
import ActiveLink from "./ActiveLink";

interface BsNavLinkProps {
  href: string | UrlObject;
  title?: string;
  className?: string;
}

export const BsNavLink: React.FC<BsNavLinkProps> = (props) => {
  const { href, title, className = "" } = props;
  return (
    <ActiveLink activeClassName="active" href={href}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

// NavBarBrand has 'a' inside it, I am not allowed to write <a> inside <a>
export const BsNavBrand = () => (
  <Link href="/">
    <a className="navbar-brand port-navbar-brand">Yilmaz BINGOL</a>
  </Link>
);

export const LoginLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/login">
    Login
  </a>
);

export const LogoutLink = () => (
  <a className="nav-link port-navbar-link" href="/api/v1/logout">
    Logout
  </a>
);
