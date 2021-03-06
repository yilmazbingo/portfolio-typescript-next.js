import BlogApi from "@/lib/api/blogs";
import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";
console.log("I am in patchign api page");

export default async function handleBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const json = await new BlogApi().getById(req.query.id as string);
    console.log("Req.query.id in blog api", req.query.id);
    return res.json(json.data);
  }

  if (req.method === "PATCH") {
    try {
      const session = await auth0.getSession(req, res);
      const accessToken = session?.accessToken;
      console.log("req.query id in patch blog api", req.query.id);
      const json = await new BlogApi(accessToken).update(
        req.query.id as string,
        req.body
      );
      return res.json(json.data);
    } catch (e) {
      console.log("e inside patc api blog", e);
      return res.status(e.status || 422).json(e.response.data);
    }
  }
}
