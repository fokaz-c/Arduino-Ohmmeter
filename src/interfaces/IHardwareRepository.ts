import {HardwareOutput} from "../models/HardwareOutput";
import {FinalOutput} from "../models/FinalOutput";

export interface IHardwareRepository {
    saveHardwareOutput(data: Omit<HardwareOutput, 'ID'>): Promise<number>;

    saveFinalOutput(hardwareOutputId: number): Promise<void>;

    getReadings(limit: number): Promise<(HardwareOutput & FinalOutput)[]>; 
}
