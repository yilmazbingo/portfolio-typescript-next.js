import Header from "@/components/layout/Header";
import { ToastContainer } from "react-toastify";
import { IUser } from "@/types/interfaces";
import SideBar from "@/components/shared/SideNav";
import Loading from "../Loading";
import Copyright from "./Copyright";

interface BaseLayoutProps {
  className?: string;
  user?: IUser;
  navClass?: string;
  loading?: boolean;
  noSideBar?: boolean;
}
const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const {
    className,
    user,
    navClass = "with-bg",
    loading,
    children,
    noSideBar,
  } = props;
  const renderer = () => (
    <div className={`baselayout ${className}`}>
      {noSideBar ? "" : <SideBar />}

      <main
        className={className}
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Header className={navClass} user={user} loading={loading} />

        {children}
        <Copyright />
      </main>
      <ToastContainer />
    </div>
  );
  return <> {renderer()} </>;
};

export default BaseLayout;
