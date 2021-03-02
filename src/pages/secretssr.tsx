import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/BasePage";
import { authorizeUser, withAuth } from "@/utils/auth0";
import { NextPageContext } from "next";
import { IUser } from "@/types/interfaces";

interface SecretSSRProps {
  user: IUser;
  title: string;
}

const SecretSSR: React.FC<SecretSSRProps> = ({ user, title }) => {
  return (
    <BaseLayout user={user} loading={false}>
      <BasePage>
        <h1>I am Secret Page - Hello {user && user.name}</h1>
        <h2>{title}</h2>
      </BasePage>
    </BaseLayout>
  );
};

// export const getServerSideProps = async ({req, res}) => {
//   const user = await authorizeUser(req, res);

//   return {
//     props: { user }
//   }
// }

const getTitle = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ title: "My new title!" });
    }, 500);
  });
};

// withAuth has to invoke the function arg inside
//  this will be invoked only in server
export const getServerSideProps = withAuth(
  async (ctx: NextPageContext, user: IUser) => {
    const title = await getTitle();
    return title;
  }
)("admin");

export default SecretSSR;

// export const setServerSideProps = ({ req, res }) => {
//   const session = await auth0.getSession(req);
//   if (!session || session.user) {
//     res.writeHead(302, {
//       Location: "/api/v1/login",
//     });
//     res.end();
//     return { props: {} };
//   }
//   return {
//     props:{user:session.user}
//   }
// };
