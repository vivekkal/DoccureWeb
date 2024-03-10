const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onlineDocDatabase', { useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.Collection;
var patientUserSchema = new mongoose.Schema({
    username: {type:String,
        required: true,
        index:{
            unique:true,
        }
    },

    email: {type:String,
        required: true,
        index:{
            unique:true,
        }
    },

    password: {type:String,
        required: true,
    },

    date:{
        type:Date,
        default:Date.now
    }
});

var patientUserModel = mongoose.model('patientUser', patientUserSchema);
module.exports = patientUserModel;