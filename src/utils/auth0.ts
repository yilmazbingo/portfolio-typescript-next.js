import { initAuth0 } from "@auth0/nextjs-auth0";
import { SignInWithAuth0 } from "@auth0/nextjs-auth0/dist/instance";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/types/interfaces";
import { Claims } from "@auth0/nextjs-auth0/dist/session/session";
console.log(" process.env.AUTH0_REDIRECT_URI", process.env.AUTH0_DOMAIN);

// this executed only on server, and env's from en.local is loaded to server
const auth0: SignInWithAuth0 = initAuth0({
  baseURL: process.env.BASE_URL,
  secret: process.env.AUTH0_COOKIE_SECRET!,
  issuerBaseURL: process.env.AUTH0_DOMAIN!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  authorizationParams: {
    scope: "openid profile email",
    audience: process.env.AUTH0__AUDIENCE,
  },
  routes: {
    callback: process.env.AUTH0_REDIRECT_URI!,
    postLogoutRedirect: "/",
  },
  // The audience of a token is the intended recipient of the token.
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7,
  },
  httpTimeout: 25000,
  clockTolerance: 60,
});
export default auth0;

// export const isAuthorized = (user, role) => {
//   return user && user[process.env.AUTH0_NAMESPACE + "/roles"].includes(role);
// };

export const isAuthorized = (user: Claims, role: string) => {
  // debugger;
  return (
    user &&
    // user[process.env.AUTH0_NAMESPACE + "/roles"] &&
    user["https://yilmazbingo.auth.com" + "/roles"].includes(role)
  );
};
// export const isAuthorized = (user, role) => {
//   console.log("process.env.AUTH0_NAMESPACE", process.env.AUTH0_NAMESPACE);
//   console.log("user", user);
//   return user && user[process.env.AUTH0_NAMESPACE + "/roles"].includes(role);
// };

export const authorizeUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await auth0.getSession(req, res);
  if (!session || !session.user) {
    res.writeHead(302, {
      Location: "/api/v1/login",
    });
    res.end();
    return null;
  }

  return session.user;
};

export const withAuth = (getData: Function) => (role: string) => async ({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await auth0.getSession(req, res);
  if (
    !session ||
    !session.user ||
    (role && !isAuthorized(session.user, role))
  ) {
    res.writeHead(302, {
      Location: "/api/v1/login",
    });
    res.end();
    return { props: {} };
  }
  // we are executing the function that passed
  const data = getData ? await getData({ req, res }, session.user) : {};

  return { props: { user: session.user, ...data } };
};
