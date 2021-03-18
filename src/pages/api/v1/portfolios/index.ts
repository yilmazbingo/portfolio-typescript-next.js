import { NextApiRequest, NextApiResponse } from "next";
import PortfolioApi from "@/lib/api/portfolios";
import auth0 from "@/utils/auth0";
import { AxiosResponse } from "axios";

export default async function createPortfolio(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let json: AxiosResponse | undefined = undefined;

  try {
    const session = await auth0.getSession(req, res);
    const accessToken = session?.accessToken;
    console.log(accessToken);
    if (accessToken) {
      json = await new PortfolioApi(accessToken).create(req.body);
    }
    debugger;
    if (json) {
      return res.json(json.data);
    }
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
