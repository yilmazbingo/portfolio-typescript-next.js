import Header from "@/components/shared/Header";
import { ToastContainer } from "react-toastify";
import { IUser } from "@/types/interfaces";

interface BaseLayoutProps {
  className?: string;
  user?: IUser;
  navClass?: string;
  loading?: boolean;
}
const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { className, user, navClass = "with-bg", loading, children } = props;
  return (
    <div className="layout-container">
      <Header className={navClass} user={user} loading={loading} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default BaseLayout;

/* <style jsx>``</style> */
// inline styling. style={{camelCase:""}}
