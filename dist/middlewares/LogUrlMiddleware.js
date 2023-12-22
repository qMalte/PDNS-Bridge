"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    let ip = req.ip;
    if (req.ip.includes("::ffff:")) {
        ip = req.ip.replace('::ffff:', '');
    }
    console.log(req.method + " - " + req.url);
    next();
};
//# sourceMappingURL=LogUrlMiddleware.js.map