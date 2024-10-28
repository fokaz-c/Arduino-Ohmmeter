export class HardwareOutput {
    ID: number;
    OutputVoltage: number;
    Resistance: number;
    
    constructor(ID: number,OutputVoltage: number,Resistance: number) {
        this.ID = ID;
        this.OutputVoltage= OutputVoltage;
        this.Resistance=Resistance;
      }
}