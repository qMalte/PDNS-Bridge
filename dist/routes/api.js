"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
const ZoneController_1 = require("../controllers/ZoneController");
const KeyController_1 = require("../controllers/KeyController");
const StatisticsController_1 = require("../controllers/StatisticsController");
const router = (0, express_1.Router)();
router.get('/zone/:id', AuthMiddleware_1.default, ZoneController_1.ZoneController.getZone);
router.get('/zones', AuthMiddleware_1.default, ZoneController_1.ZoneController.getZones);
router.post('/zone', AuthMiddleware_1.default, ZoneController_1.ZoneController.postZone);
router.put('/zone', AuthMiddleware_1.default, ZoneController_1.ZoneController.patchZone);
router.delete('/zone/:id', AuthMiddleware_1.default, ZoneController_1.ZoneController.deleteZone);
router.get('/zone/:id/keys', AuthMiddleware_1.default, KeyController_1.KeyController.getKeys);
router.post('/zone/key', AuthMiddleware_1.default, KeyController_1.KeyController.PostKey);
router.delete('/zone/:id/keys', AuthMiddleware_1.default, KeyController_1.KeyController.DeleteKeys);
router.get('/stats', AuthMiddleware_1.default, StatisticsController_1.StatisticsController.getStatistics);
exports.default = router;
//# sourceMappingURL=api.js.map