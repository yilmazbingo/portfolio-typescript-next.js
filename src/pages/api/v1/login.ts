import auth0 from "@/utils/auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // this shows the login screen and then makes request to "auth0.com/authorize".
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.log("error in login", error);
    console.log("in error catch login");
    res.status(error.status || 400).end(error.message);
  }
}
//res.send() will set "ETag" but res.end() wont. The ETag HTTP response header is an identifier for a specific version of a resource. It allows caches to be more efficient, and saves bandwidth, as a web server does not need to send a full response if the content has not changed.
//res.end() you can only respond with text and it will not set "Content-Type"

// type annotation on catch clause is not allowed because error could be anything.
