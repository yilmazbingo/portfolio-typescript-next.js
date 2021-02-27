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
  const renderer = () =>
    loading ? (
      <Loading />
    ) : (
      <div className="baselayout">
        <SideBar />

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
