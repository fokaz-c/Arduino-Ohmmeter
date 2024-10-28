export class FinalOutput {
    ID: number;
    DateTime: Date;
    HardwareOutputId: number;
    
    constructor(ID: number, DateTime: Date,HardwareOutputId: number) {
        this.ID = ID;
        this.DateTime= DateTime;  
        this.HardwareOutputId=HardwareOutputId;
      }
}

// const x:FinalOutput = new FinalOutput();
// console.log(x);




