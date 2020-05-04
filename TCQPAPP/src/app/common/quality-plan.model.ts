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
    questionNo: string;
    qualityCharacteristic: string;
    qualitySubCharacteristic: string;
    qualityAttribute: string;

}

export class Measurement {
    name: string;
    informalDefinition: string;
    measurementType: string;
    measurementMethod: string;
    scaleType: string;
    scaleRange: string;
    interpretation: string;
}

export class QualityPlanAttribute {
    testLevelsArray: any = ['Unit Testing', 'Integration Testing'];
    testCaseTypeArray: any = ['Code-based Test Cases', 'Natural Language Test Cases'];
    developmentPhaseArray: any = ['Requirements Specification', 'Design', 'Implementation', 'Testing', 'Maintenance', 'Migration'];
    purposeArray: any = ['Quality Assessment', 'Quality Monitoring', 'Quality Prediction', 'Quality Control'];
    qualityCharacteristicArray: any = ['Test Effectivity', 'Reliability', 'Usability', 'Performance Efficiency', 'Security', 'Maintainability', 'Portability', 'Reusability'];
    measurementTypeArray: any = ['Subjective', 'Objective'];
    scaleTypeArray: any = ['Nominal', 'Ordinal', 'Absolute', 'Ratio'];
}