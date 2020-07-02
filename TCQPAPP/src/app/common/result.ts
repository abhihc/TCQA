export class Result {
    name: string;
    results: Qualityresults
}

export class Qualityresults{
    qualityPlan : string;
    QualityCharacteristics : Array<QualityCharacteristic>;
}

export class QualityCharacteristic { 
    qualityCharacteristic : string;
    scoreQC : number;
    QualitySubCharacteristics : Array<QualitySubCharacteristic>;
}

export class QualitySubCharacteristic {
    qualitySubCharacteristic : string;
    scoreQBC : number ;
    QualitySubCharacteristics : Array<QualityAttribute>;
}

export class QualityAttribute { 
    qualityAttribute : string;
    scoreQA : number;
}