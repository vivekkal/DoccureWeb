const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onlineDocDatabase', { useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.Collection;
var doctorUserSchema = new mongoose.Schema({
    usernameDoc: {type:String,
        required: true,
        index:{
            unique:true,
        }
    },

    emailDoc: {type:String,
        required: true,
        index:{
            unique:true,
        }
    },

    passwordDoc: {type:String,
        required: true,
    },

    date:{
        type:Date,
        default:Date.now
    }
});

var doctorUserModel = mongoose.model('doctorUser', doctorUserSchema);
module.exports = doctorUserModel;