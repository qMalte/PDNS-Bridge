"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const ZoneController_1 = require("../controllers/ZoneController");
const KeyController_1 = require("../controllers/KeyController");
const StatisticsController_1 = require("../controllers/StatisticsController");
const lib_1 = require("typeauthx/lib");
const router = (0, express_1.Router)();
exports.userRouter = router;
const AuthMiddleware = lib_1.Middlewares.AuthMiddleware;
router.get('/zone/:id', AuthMiddleware, ZoneController_1.ZoneController.getZone);
router.get('/zones', AuthMiddleware, ZoneController_1.ZoneController.getZones);
router.post('/zone', AuthMiddleware, ZoneController_1.ZoneController.postZone);
router.put('/zone', AuthMiddleware, ZoneController_1.ZoneController.patchZone);
router.put('/zone/basic', AuthMiddleware, ZoneController_1.ZoneController.patchBasicZone);
router.delete('/zone/:id', AuthMiddleware, ZoneController_1.ZoneController.deleteZone);
router.get('/zone/:id/keys', AuthMiddleware, KeyController_1.KeyController.getKeys);
router.post('/zone/key', AuthMiddleware, KeyController_1.KeyController.PostKey);
router.delete('/zone/:id/keys', AuthMiddleware, KeyController_1.KeyController.DeleteKeys);
router.get('/stats', AuthMiddleware, StatisticsController_1.StatisticsController.getStatistics);
//# sourceMappingURL=user.js.map