const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');

var qualityPlanController = require('./controllers/qualityPlanController.js');
var qualityPlanResultsController = require('./controllers/qualityPlanResultsController.js');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors({ origin: 'http://localhost:4200' }));


app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/qualityPlans', qualityPlanController);
app.use('/qualityPlanResults', qualityPlanResultsController);
