import {Router} from 'express';
import AuthMiddleware from "../middlewares/AuthMiddleware";
import {ZoneController} from "../controllers/ZoneController";
import {KeyController} from "../controllers/KeyController";
import {StatisticsController} from "../controllers/StatisticsController";
import {UserController} from "../controllers/UserController";

const router = Router();

router.get('/zone/:id', AuthMiddleware, ZoneController.getZone);
router.get('/zones', AuthMiddleware, ZoneController.getZones);
router.post('/zone', AuthMiddleware, ZoneController.postZone);
router.put('/zone', AuthMiddleware, ZoneController.patchZone);
router.put('/zone/basic', AuthMiddleware, ZoneController.patchBasicZone);
router.delete('/zone/:id', AuthMiddleware, ZoneController.deleteZone);

router.get('/zone/:id/keys', AuthMiddleware, KeyController.getKeys);
router.post('/zone/key', AuthMiddleware, KeyController.PostKey);
router.delete('/zone/:id/keys', AuthMiddleware, KeyController.DeleteKeys);

router.get('/stats', AuthMiddleware, StatisticsController.getStatistics);

router.get('/user/mails', UserController.getUserWithAddresses);

export default router;