import express from "express";

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let ip = req.ip;

    if (req.ip.includes("::ffff:")) {
        ip = req.ip.replace('::ffff:', '');
    }

    console.log(req.method + " - " + req.url);
    next();
};
