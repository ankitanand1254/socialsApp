const mongoose = require('mongoose');
const env = require('./environment');

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb://localhost/${env.db}`, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;