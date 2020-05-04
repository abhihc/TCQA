const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:dbUser@cluster0-llkcd.mongodb.net/test?retryWrites=true&w=majority', { useFindAndModify: false , useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err){
        console.log('MongoDB connection succeeded.');
    }
    else
    {
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;