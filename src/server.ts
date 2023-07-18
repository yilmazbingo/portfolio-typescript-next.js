import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler(); // this will handle the requests

app.prepare().then(() => {
  const server = express();

  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3003;
  server.listen(PORT, () => {
    console.log(`> Ready on port ${PORT}`);
    // console.log("process versions", process.versions);
  });
});
