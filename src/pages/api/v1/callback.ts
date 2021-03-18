import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

// export default async function callback(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await auth0.handleCallback(req, res, {
//       async afterCallback(req, res, session, state) {
//         res.redirect("/");
//         return session;
//       },
//     });
//   } catch (error) {
//     debugger;
//     console.error("error in handleCallback", error.message);
//     res.status(error.status || 400).end(error.message);
//   }
// }

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth0.handleCallback(req, res, {
      async afterCallback(req, res, session, state) {
        return session;
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
