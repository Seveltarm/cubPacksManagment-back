var mongoose = require('mongoose');

var starSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    tasks: String,
    comment: String,
    packId: String,
    category: Number
});

module.exports = mongoose.model('star', starSchema);