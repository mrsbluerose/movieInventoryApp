const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Movie', MovieSchema);