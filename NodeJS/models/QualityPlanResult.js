const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let QualityPlanResult = new Schema({
   name: {
      type: String //name of the JSON file
   },
   qualityPlan: {
      type: String //name of the quality plan
   },
   results: {} //Quality Characteristics,Quality Sub-Characteristics, Quality Attributes and their respective score 
}, {
   collection: 'quality_plan_results'
})

module.exports = mongoose.model('QualityPlanResult', QualityPlanResult)