var mongoose = require('mongoose');

var badgeSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    tasks: String,
    comment: String,
    logo: String,
    packId: String,
    category: Number
});

module.exports = mongoose.model('badge', badgeSchema);