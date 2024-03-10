const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onlineDocDatabase', { useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.Collection;
var patientProfileSchema = new mongoose.Schema({
    
    FName: {type:String,
        
    },

    LName: {type:String,
       
    },

    DOB: {type:Number,
       
    },

    BloodGroup: {type:String,
       
    },

    Email: {type:String,
        required: true,
        index:{
            unique:true,
        }
    },

    MobileNo: {type:String,
       
    },

    Address: {type:String,
        
    },

    City: {type:String,
        
    },

    State: {type:String,
       
    },

    Zipcode: {type:String,
        
    },

    Country: {type:String,
        
    },

    date:{
        type:Date,
        default:Date.now
    }
});

var patientProfileModel = mongoose.model('patientProfile', patientProfileSchema);
module.exports = patientProfileModel;