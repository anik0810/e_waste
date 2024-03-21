import express from "express";
import { getAllDeviceList, registerNewDevice, updateEWaste } from "../controller/DeviceComtroller";

const router = express.Router();

// router.get("/")
router.post("/registerNewDevice", registerNewDevice);
router.put("/updateEWaste", updateEWaste);
router.get("/getAllDeviceList", getAllDeviceList)

export { router as DeviceRouter }