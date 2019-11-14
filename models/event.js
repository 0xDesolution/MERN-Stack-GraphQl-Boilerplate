const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const eventSchema = new Scheme({
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    creator:{
        type: Scheme.Types.ObjectId,
        ref:'User'
    }
    
});

module.exports = mongoose.model('Event',eventSchema);