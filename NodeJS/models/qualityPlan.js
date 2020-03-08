const mongoose =  require('mongoose');

var QualityPlan = mongoose.model('QualityPlan',{
    testObject: {type: String},
    testItem: {type: String},
    testSuite: {type: String},
    testLevels: {type: String },
    testCaseType: {type: String},
    developmentPhase: {type: String},
    sourceTestingFramework: {type: String},
    targetTestingFramework: {type: String},
    goalArray: {type: Array},
    qualityPlanName: {type: String}
});

module.exports = { QualityPlan };

