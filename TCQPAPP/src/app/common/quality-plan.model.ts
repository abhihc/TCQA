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
    // objectOfStudy: any;
    // purpose: any;
    // qualityFocus: string;
    // viewpoint: string;
    // context: string;
    goalDimensions: any;
    goalArray: Array<goalArray>;
    question: string;
    qualityPlanName: string;
}

export class goalArray{
    objectOfStudy: string;
    purpose: string;
}
