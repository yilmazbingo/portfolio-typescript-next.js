import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { authorizeUser, withAuth } from "@/utils/auth0";
import { IUser } from "@/types/interfaces";
import { NextPageContext } from "next";

interface OnlyAdminProps {
  user: IUser;
  title: string;
}

const OnlyAdminSSR: React.FC<OnlyAdminProps> = ({ user, title }) => {
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
        <h1>I am Secret Page - Hello {user && user.name}</h1>
        <h2>{title}</h2>
      </BasePage>
    </BaseLayout>
  );
};

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ title: "My new title!" });
    }, 500);
  });
};

export const getServerSideProps = withAuth(
  async (ctx: NextPageContext, user: IUser) => {
    const title = await getTitle();
    return title;
  }
)("admin");

export default withAuth(OnlyAdminSSR)("admin");
