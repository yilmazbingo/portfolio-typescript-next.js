import { GetStaticProps } from "next";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { useGetUser } from "@/actions/user";
import { formatDate } from "@/helpers/functions";
import PortfolioApi from "@/lib/api/portfolios";
import { useRouter } from "next/router";
import { IPortfolio } from "@/types/interfaces";

interface PortfolioProps {
  portfolio: IPortfolio;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const { data: dataU, loading } = useGetUser();
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Your page is getting server</h1>;
  }

  return (
    <BaseLayout navClass="transparent" user={dataU} loading={loading}>
      <BasePage
        indexPage
        title={`${portfolio.title} - YILMAZ BINGOL`}
        metaDescription={portfolio.description}
      >
        <div className="portfolio-detail">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              {router.isFallback && (
                <h1 className="cover-heading">
                  Your page is getting served...
                </h1>
              )}
              {!router.isFallback && (
                <>
                  <h1 className="cover-heading">{portfolio.title}</h1>
                  <p className="lead dates">
                    {formatDate(portfolio.startDate)} -{" "}
                    {formatDate(portfolio.endDate) || "Present"}
                  </p>
                  <p className="lead info mb-0">
                    {portfolio.jobTitle} | {portfolio.company} |{" "}
                    {portfolio.location}
                  </p>
                  <p className="lead">{portfolio.description}</p>
                  <p className="lead">
                    <a
                      href={portfolio.companyWebsite}
                      target="_"
                      className="btn btn-lg btn-secondary"
                    >
                      Visit Company
                    </a>
                  </p>
                </>
              )}
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

// this function is executed at built time Without getStaticProps, getStaticPaths does nothing without props
export async function getStaticPaths() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  // we get those paths and pass them to the server, so it will create the pages on the server
  // we prerender based on portfolio id.
  const paths = portfolios.map((portfolio: IPortfolio) => {
    return {
      params: { id: portfolio._id },
    };
  });

  // fallbach says if page not found, we display 404 page
  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const json = await new PortfolioApi().getById(context?.params?.id as string);
  const portfolio = json.data;
  return { props: { portfolio }, revalidate: 1 };
};

type Params = { id: string };

export default Portfolio;
