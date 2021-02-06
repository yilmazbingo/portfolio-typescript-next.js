import BlogApi from "@/lib/api/blogs";
import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const json = await new BlogApi().getById(req.query.id as string);
    return res.json(json.data);
  }

  if (req.method === "PATCH") {
    try {
      const session = await auth0.getSession(req);
      const accessToken = session?.accessToken;
      const json = await new BlogApi(accessToken).update(
        req.query.id as string,
        req.body
      );
      return res.json(json.data);
    } catch (e) {
      return res.status(e.status || 422).json(e.response.data);
    }
  }
}
