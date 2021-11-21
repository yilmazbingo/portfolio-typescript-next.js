import PortfolioApi from "@/lib/api/portfolios";
import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlePortfolio(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const json = await new PortfolioApi().getById(req.query.id as string);
    return res.json(json.data);
  }

  if (req.method === "PATCH") {
    try {
      const session = await auth0.getSession(req, res);
      const accessToken = session?.accessToken;
      const json = await new PortfolioApi(accessToken).update(
        req.query.id as string,
        req.body
      );
      return res.json(json.data);
    } catch (e) {
      return res.status(e.status || 422).json(e.response.data);
    }
  }

  if (req.method === "DELETE") {
    const session = await auth0.getSession(req, res);
    const accessToken = session?.accessToken;
    const json = await new PortfolioApi(accessToken).delete(
      req.query.id as string
    );
    return res.json(json.data);
  }
}
