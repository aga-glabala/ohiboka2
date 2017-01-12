var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BraceletSchema   = new Schema({
    name: String,
    strings: Array,
    type: String,
    public: Boolean,
    rows: Array
});

module.exports = mongoose.model('Bracelet', BraceletSchema);
