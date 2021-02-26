import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/router";
import { useGetPortfolio } from "@/actions/portfolios";
import PortfolioForm from "@/components/PortfolioForm";
import { Row, Col } from "reactstrap";
import { useUpdatePortfolio } from "@/actions/portfolios";
import { toast } from "react-toastify";
import { IPortfolio, IUser } from "@/types/interfaces";

const PortfolioEdit = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id as string);

  const _updatePortfolio = async (data: IPortfolio) => {
    await updatePortfolio(router.query.id, data);
    toast.success("Portfolio has been updated!", { autoClose: 2000 });
  };

  return (
    <BaseLayout user={user} loading={false} className="portfolio-new-layout">
      <BasePage header="Portfolio Edit" className="portfolio-new-page">
        {initialData && (
          <PortfolioForm
            onSubmit={() => _updatePortfolio}
            initialData={initialData}
            submitButtonName="Edit Portfolio"
          />
        )}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(PortfolioEdit)("admin");
