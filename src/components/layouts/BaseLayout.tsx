import Header from "@/components/shared/Header";
import { ToastContainer } from "react-toastify";
import { IUser } from "@/types/interfaces";
import SideBar from "@/components/shared/SideNav";
import Loading from "../Loading";
import Copyright from "../shared/Copyright";

interface BaseLayoutProps {
  className?: string;
  user?: IUser;
  navClass?: string;
  loading?: boolean;
}
const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { className, user, navClass = "with-bg", loading, children } = props;
  // display:flex will keep sideBar and main side by side
  const renderer = () =>
    loading ? (
      <Loading />
    ) : (
      <div
        className="baselayout"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Header className={navClass} user={user} loading={loading} />
        {/* this will kepp sidenav and page side by side */}
        <main style={{ display: "flex" }} className={className}>
          <SideBar />

          {children}
        </main>
        <Copyright />
        <ToastContainer />
      </div>
    );
  return <> {renderer()} </>;
};

export default BaseLayout;

/* <style jsx>``</style> */
// inline styling. style={{camelCase:""}}
