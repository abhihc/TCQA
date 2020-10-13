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
  QualityCharacteristics: Array<QualityCharacteristic>;
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

export class QualityCharacteristic {
  qualityCharacteristic: string;
  qualitySubCharacteristics: Array<QualitySubCharacteristic>;
}

export class QualitySubCharacteristic {
  qualitySubCharacteristic: string;
  qualityAttributes: Array<QualityAttribute>;
}

export class QualityAttribute {
  qualityAttribute: string;
  questionNumber: string;
}

export class Measurement {
  name: string;
  informalDefinition: string;
  measurementType: string;
  measurementMethod: string;
  scaleType: string;
  scaleRange: string;
  interpretation: string;
  thresholdValue: number;
}

export class QualityPlanAttribute {
  testLevelsArray: any = ["Unit Testing", "Integration Testing"];
  testCaseTypeArray: any = [
    "Code-based Test Cases",
    "Natural Language Test Cases",
  ];
  developmentPhaseArray: any = [
    "Requirements Specification",
    "Design",
    "Implementation",
    "Testing",
    "Maintenance",
    "Migration",
  ];
  purposeArray: any = [
    "Quality Assessment",
    "Quality Monitoring",
    "Quality Prediction",
    "Quality Control",
  ];
  QualityCharacteristics1: any = [
    "Test Effectivity",
    "Reliability",
    "Usability",
    "Performance Efficiency",
    "Security",
    "Maintainability",
    "Portability",
    "Reusability",
  ];
  measurementTypeArray: any = ["Subjective", "Objective"];
  scaleTypeArray: any = ["Nominal", "Ordinal", "Absolute", "Ratio"];
  qualityAspects = [
    {
      qc: "Test Effectivity",
      qbc: [
        "Test Coverage",
        "Test Correctness",
        "Fault-Revealing Capability",
        "Test Confidence",
      ],
    },
    {
      qc: "Reliability",
      qbc: [
        "Test Repeatability",
        "Maturity",
        "Fault Tolerance",
        "Recoverability",
      ],
    },
    {
      qc: "Usability",
      qbc: [
        "Understandability",
        "Learnability",
        "Operability",
        "Test Evaluability",
      ],
    },
    {
      qc: "Performance Efficiency",
      qbc: ["Time Behaviour", "Resource Utilization"],
    },
    {
      qc: "Security",
      qbc: ["Confidentiality", "Accountability", "Authenticity"],
    },
    {
      qc: "Maintainability",
      qbc: ["Analysability", "Analysability", "Stability", "Complexity"],
    },
    {
      qc: "Portability",
      qbc: ["Adaptability", "Installability"],
    },
    {
      qc: "Reusability",
      qbc: ["Coupling", "Flexibility"],
    },
  ];
}
