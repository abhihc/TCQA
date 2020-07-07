const mongoose =  require('mongoose');

var Tool = mongoose.model('Tool',{
    qualityAttribute: String,
    toolInfo: String
});

module.exports = { Tool };

