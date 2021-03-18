import auth0 from "@/utils/auth0";
import BlogApi from "@/lib/api/blogs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUserBlogs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const { accessToken } = await auth0.getSession(req);
    const session = await auth0.getSession(req, res);
    const accessToken = session?.accessToken;
    let json: any;
    if (accessToken) {
      json = await new BlogApi(accessToken).getByUser();
    }
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
