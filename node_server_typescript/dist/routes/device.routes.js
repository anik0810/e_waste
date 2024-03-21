"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRouter = void 0;
const express_1 = __importDefault(require("express"));
const DeviceComtroller_1 = require("../controller/DeviceComtroller");
const router = express_1.default.Router();
exports.DeviceRouter = router;
// router.get("/")
router.post("/registerNewDevice", DeviceComtroller_1.registerNewDevice);
router.put("/updateEWaste", DeviceComtroller_1.updateEWaste);
router.get("/getAllDeviceList", DeviceComtroller_1.getAllDeviceList);
