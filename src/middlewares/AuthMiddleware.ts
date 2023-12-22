import express from "express";

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authorizationToken = req.header("Authorization");

    if (authorizationToken == null) {
        return res.status(400).end();
    }

    if (process.env.ADMIN_KEY == null) {
        return res.status(500).end();
    }

    if (authorizationToken !== process.env.ADMIN_KEY) {
        return res.status(403).end();
    }

    next();

};
