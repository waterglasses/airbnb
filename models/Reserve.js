var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    check_in: {type: String},
    check_out: {type: String},
    number_op: {type: String},
    requestAt: {type: Date, default: Date.now}
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});
    
var Reserve = mongoose.model('Reserve', schema);
    
module.exports = Reserve;