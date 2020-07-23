const express = require('express');
const app = express();
const qualityPlanResultsController = express.Router();

// Quality Plan Assessment Result model
let QualityPlanResult = require('../models/QualityPlanResult');

// Add Quality Plan assessment result
qualityPlanResultsController.route('/add-result').post((req, res, next) => {
    var newQualityPlanResult = req.body;
    newQualityPlanResult.qualityPlan = req.body.results.qualityPlan;
    QualityPlanResult.create(newQualityPlanResult, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all ids
qualityPlanResultsController.get('/', (req, res) => {
    QualityPlanResult.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving results:' + JSON.stringify(err, undefined, 2)); }
    });
});

// Get all Quality Plan name
qualityPlanResultsController.route('/').get((req, res) => {
    QualityPlanResult.find({}, 'name qualityPlan', (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})



// Get all Quality Plans list
qualityPlanResultsController.route('/list-quality-plans').get((req, res) => {
    QualityPlanResult.aggregate().
        group({ _id: '$qualityPlan', count: { $sum: 1 } }).
        project('id count').
        exec((error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
})

// Get all Quality Plan assessment results
qualityPlanResultsController.route('/quality-plan-results').get((req, res) => {
    QualityPlanResult.find({ qualityPlan: req.query.qualityPlan }, 'name', (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Quality Plan assessment result
qualityPlanResultsController.route('/result/:id').get((req, res) => {
    QualityPlanResult.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Quality Plan assessment result
qualityPlanResultsController.route('/update-result/:id').put((req, res, next) => {
    QualityPlanResult.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
    })
})

// Delete Quality Plan assessment Result
qualityPlanResultsController.route('/delete-result/:id').delete((req, res, next) => {
    QualityPlanResult.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = qualityPlanResultsController;