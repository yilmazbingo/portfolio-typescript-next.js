import BlogApi from "@/lib/api/blogs";
import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createBlog(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await auth0.getSession(req);
    const accessToken = session?.accessToken;
    let json: any;
    if (accessToken) {
      json = await new BlogApi(accessToken).create(req.body);
    }
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
