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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEWaste = exports.getAllDeviceList = exports.registerNewDevice = void 0;
const CounterSchema_1 = __importDefault(require("../model/CounterSchema"));
const registerNewDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { device_id, e_waste, device_location } = req.body;
    if (!device_id || !e_waste) {
        res.status(422).json({
            message: "fields are empty"
        });
    }
    else {
        try {
            const isExist = yield CounterSchema_1.default.findOne({ device_id: device_id });
            if (isExist) {
                return res.status(409).json({
                    message: "Device Already exist",
                });
            }
            const payload = {
                device_id,
                device_location,
                e_waste
            };
            const response = yield new CounterSchema_1.default(payload).save();
            console.log(response);
            if (response) {
                return res.status(200).json({
                    message: "device register successfully",
                    result: response
                });
            }
        }
        catch (error) {
            return res.status(400).json({
                message: "error in server",
                error
            });
        }
    }
});
exports.registerNewDevice = registerNewDevice;
const getAllDeviceList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const response = yield CounterSchema_1.default.find(filter).lean();
        if (response) {
            return res.status(200).json({
                message: "device list get successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.getAllDeviceList = getAllDeviceList;
const updateEWaste = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { device_id, e_waste } = req.body;
        console.log(e_waste);
        const response = yield CounterSchema_1.default.updateOne({ device_id }, {
            $set: {
                e_waste: e_waste
            }
        });
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        });
    }
});
exports.updateEWaste = updateEWaste;
