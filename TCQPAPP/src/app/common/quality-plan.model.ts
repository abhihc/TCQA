export class QualityPlan {
    _id: string;
    testObject: string;
    testItem: string;
    testSuite: string;
    testLevels: string;
    testCaseType: string;
    developmentPhase: string;
    sourceTestingFramework: string;
    targetTestingFramework: string;
    goalArray: Array<Goal>;
    questionArray: Array<Question>;
    qualityFactorArray: Array<QualityFactor>;
    measurementArray: Array<Measurement>;
    qualityPlanName: string;
}

export class Goal {
    objectOfStudy: string;
    purpose: string;
    qualityFocus: string;
    viewpoint: string;
    context: string;
}

export class Question {
    question: string;
}



export class QualityFactor {
    qualityCharacteristic: string;
    qualitySubCharacteristic: string;
    qualityAttribute: string;

}

export class Measurement{
    name: string;
    informalDefinition: string;
    measurementType: string;
    measurementMethod: string;
    scaleType: string;
    scaleRange: string;
    intepretation: string;
}