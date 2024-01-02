// middlewares/redirectMiddleware.ts

import { NextApiHandler } from "next";

const redirectMiddleware: NextApiHandler = async (req, res) => {
  // Redirect logic here
  if (req.url === "/") {
    res.writeHead(302, { Location: "/home" });
    res.end();
    return;
  }

  // Continue to the next middleware or route handler
  return;
};

export default redirectMiddleware;
