import mongoose, { Schema } from "mongoose";
import { DeviceInterface } from "../@types/interface/DeviceInterface";


export const deviceSchema: Schema<DeviceInterface> = new mongoose.Schema({
	device_id:{
        type:String,
        required:[true,"device_id can not be blank"],
    },
    device_location:{
        type:String,
        required:[true,"location can not be blank"],
    },
    e_waste:{
        type:Number,
        default:0
    }
}
);

const DeviceModel = mongoose.model<DeviceInterface>("deviceDetails", deviceSchema);

export default DeviceModel;