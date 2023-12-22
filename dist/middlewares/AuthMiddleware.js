"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
});
//# sourceMappingURL=AuthMiddleware.js.map