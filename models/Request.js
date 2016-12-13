var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    check_in: {type: String},
    check_out: {type: String},
    number_op: {type: String},
    requestAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, index: true, required: true},
    task: {type: Schema.Types.ObjectId, index: true, required: true},
    host_name : {type: String},
}, {
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

var Request = mongoose.model('Request', schema);
    
module.exports = Request;