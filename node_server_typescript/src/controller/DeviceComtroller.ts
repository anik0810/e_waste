import { Request, Response } from "express";
import DeviceModel from "../model/CounterSchema";
import { DeviceInterface } from "../@types/interface/DeviceInterface";


export const registerNewDevice = async (req: Request, res: Response) => {
    const { device_id, e_waste, device_location } = req.body;
    if (!device_id || !e_waste) {
        res.status(422).json({
            message: "fields are empty"
        })
    }
    else {
        try {
            const isExist = await DeviceModel.findOne({device_id:device_id});
            if(isExist){
                return res.status(409).json({
                    message:"Device Already exist",
                })
            }
            const payload: DeviceInterface = {
              device_id,
              device_location,
              e_waste
            }
            const response = await new DeviceModel(payload).save();
            console.log(response);
            if (response) {
                return res.status(200).json({
                    message: "device register successfully",
                    result: response
                })
            }
        }
        catch (error) {
            return res.status(400).json({
                message: "error in server",
                error
            })
        }
    }
}

export const getAllDeviceList = async (req: Request, res: Response) => {
    try {
        const filter = req.query;
        const response = await DeviceModel.find(filter).lean();
        if (response) {
            return res.status(200).json({
                message: "device list get successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}

export const updateEWaste = async (req: Request, res: Response) => {
    try {
        const { device_id, e_waste } = req.body;
        console.log(e_waste);
        const response = await DeviceModel.updateOne(
            { device_id },
            {
                $set: {
                    e_waste: e_waste
                }
            }
        );
        if (response) {
            return res.status(200).json({
                message: "data updated successfully",
                data: response
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "error in server",
            error
        })
    }
}