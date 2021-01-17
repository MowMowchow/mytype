var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    Username: String,
    Email: String,
    wpm_list: Array,
    Alphabet: Object
});

module.exports = mongoose.model('User', user);