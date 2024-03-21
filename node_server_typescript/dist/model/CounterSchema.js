"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.deviceSchema = new mongoose_1.default.Schema({
    device_id: {
        type: String,
        required: [true, "device_id can not be blank"],
    },
    device_location: {
        type: String,
        required: [true, "location can not be blank"],
    },
    e_waste: {
        type: Number,
        default: 0
    }
});
const DeviceModel = mongoose_1.default.model("deviceDetails", exports.deviceSchema);
exports.default = DeviceModel;
