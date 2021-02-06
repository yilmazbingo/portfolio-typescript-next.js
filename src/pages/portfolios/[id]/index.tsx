import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { formatDate } from "@/helpers/functions";
import PortfolioApi from "@/lib/api/portfolios";
import { useRouter } from "next/router";
import { IPortfolio } from "@/types/interfaces";

interface PortfolioProps {
  portfolio: IPortfolio;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const { data: dataU, loading: loadingU } = useGetUser();
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Your page is getting server</h1>;
  }

  return (
    <BaseLayout navClass="transparent" user={dataU} loading={loadingU}>
      <BasePage
        noWrapper
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

// this function is executed at built time
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

export async function getStaticProps({ params }: { params: Params }) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: { portfolio }, unstable_revalidate: 1 };
}

type Params = { id: string };

export default Portfolio;
