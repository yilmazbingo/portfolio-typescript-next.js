import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth0.handleProfile(req, res);
  } catch (error) {
    console.log("error in v1/me ", error);
    res.status(error.status || 400).end(error.message);
  }
}
