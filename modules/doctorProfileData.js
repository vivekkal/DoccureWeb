const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/onlineDocDatabase', { useNewUrlParser: true, useUnifiedTopology: true});
var conn = mongoose.Collection;
var doctorProfileSchema = new mongoose.Schema({
    // uname: {type:String,        
    // },
    // emailid: {type:String,       
    // },

    FirstName: {type:String,       
    },

    LastName: {type:String,       
    },

    MobNo: {type:Number,       
    },

    Gender:{type:String,
    },

    DateOfBirth:{type:Number
    },

    RegistrationCouncil:{type:String,
    },

    RegistrationNumber:{type:Number, 
    },

    RegistrationYear:{type:Number, 
    },

    Degree:{type:String,       
    },

    Institute:{type:String,       
    },

    YearOfCompletion:{type:Number,       
    },

    HospitalName:{type:String,
    },

    From:{type:Number, 
    },

    To:{type:Number, 
    },

    Designation:{type:String,
    },

    services:{type:String,       
    },

    specialist:{type:String,       
    },

    PersonalAddress: {type:String,       
    },

    City:{type:String,       
    },

    PinCode: {type:Number,       
    },

    State:{type:String,       
    },

    Country:{type:String,       
    },  

    // rating_option:{type:String,       
    // },

    // custom_rating_count:{type:Number,       
    // },  
    
    date:{
        type:Date,
        default:Date.now
    }
});

var doctorProfileModel = mongoose.model('doctorProfile', doctorProfileSchema);
module.exports = doctorProfileModel;