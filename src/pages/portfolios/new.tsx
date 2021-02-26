import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { Row, Col, Container } from "reactstrap";
import PortfolioForm from "@/components/PortfolioForm";
import { useCreatePortfolio } from "@/actions/portfolios";
import Redirect from "@/components/shared/Redirect";
import { IUser } from "@/types/interfaces";
import ContactForm from "@/components/ContactForm";

interface PortfolioNewProps {
  user: IUser;
  loading: boolean;
}
const PortfolioNew: React.FC<PortfolioNewProps> = ({
  user,
  loading: userLoading,
}) => {
  const [createPortfolio, { data, loading, error }] = useCreatePortfolio();

  if (data) {
    return <Redirect to="/portfolios" />;
  }

  return (
    <BaseLayout
      user={user}
      loading={userLoading}
      className="portfolio-new-layout"
    >
      <BasePage
        header="Create Portfolio"
        noWrapper
        className="portfolio-new-page"
      >
        <PortfolioForm onSubmit={createPortfolio} />
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(PortfolioNew)("admin");
// export default PortfolioNew;
