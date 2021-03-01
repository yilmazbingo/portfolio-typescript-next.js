import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler(); // this will handle the requests

app.prepare().then(() => {
  console.log(
    "env variables",
    process.env.AUTH0_DOMAIN,
    process.env.AUTH0_REDIRECT_URI,
    process.env.AUTHO_POST_LOGOUT_REDIRECT_URI
  );
  const server = express();

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on port ${PORT}`);
    // console.log("process versions", process.versions);
  });
});
