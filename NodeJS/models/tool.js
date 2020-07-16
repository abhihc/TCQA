const mongoose = require('mongoose');

var Tool = mongoose.model('Tool', {
    qualityAttribute: [],
    toolName: String,
    toolInfo: String
});

module.exports = { Tool };