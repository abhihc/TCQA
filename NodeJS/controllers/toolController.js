const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// Tool Details model
var { Tool } = require('../models/tool');

// => localhost:3000/tools/
// Get all tools
router.get('/', (req, res) => {
    Tool.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving Tool :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Save Tool information
router.post('/', (req, res) => {
    var tool = new Tool({
        qualityAttribute: req.body.qualityAttribute,
        toolName: req.body.toolName,
        toolInfo: req.body.toolInfo
    });
    tool.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in quality Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Edit Tool information
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tool = new Tool({
        qualityAttribute: req.body.qualityAttribute,
        toolName: req.body.toolName,
        toolInfo: req.body.toolInfo
    });

    var toolData = tool.toObject();

    delete toolData._id;

    var query = { _id: req.params.id };

    Tool.updateOne(query, toolData, { upsert: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in tool update :' + JSON.stringify(err, undefined, 2)); }
    });
});

// Delete Tool information
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Tool.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in tool detail Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;