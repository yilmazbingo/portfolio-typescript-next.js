import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: "/" });
  } catch (error) {
    debugger;
    console.error("error in handleCallback", error.message);
    res.status(error.status || 400).end(error.message);
  }
}
