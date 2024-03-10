var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var patientUserModule = require('../modules/patientUser');
var doctorUserModule = require('../modules/doctorUser');

var patientProfileModel = require('../modules/patientProfileData');
var doctorProfileModel = require('../modules/doctorProfileData');

var getPatientProfile = patientProfileModel.find({});
var getDoctorProfile = doctorProfileModel.find({});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkLoginUser(req, res, next){
  var userToken = localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/login');
  }
  next();
   
}

function checkEmail(req, res, next){
  var email=req.body.email;
  var checkexitsEmail=patientUserModule.findOne({email:email});
  checkexitsEmail.exec((err, data)=>{
   if(err) throw err;
   if(data){
    return res.render('register', { title: '', msg:'Email Already Exists. Try another one.. ' });
   }
   next();
  })
}

function checkUsername(req, res, next){
  var username=req.body.username;
  var checkexitsUsername=patientUserModule.findOne({username:username});
  checkexitsUsername.exec((err, data)=>{
   if(err) throw err;
   if(data){
    return res.render('register', { title: '', msg:'Username Already Exists. Try another one.. ' });
   }
   next();
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index-2', function(req, res, next) {
  res.render('index-2', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('/patient-dashboard');
  }else{
    res.render('login', { title: 'Express', msg:'' });
  }
  
});

router.get('/logout', function(req, res, next) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/login');
});


router.get('/patient-dashboard',  checkLoginUser, function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  res.render('patient-dashboard', { title: 'Express', loginUser: loginUser,  msg:'' });
});

router.get('/profile-settings',  checkLoginUser, function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  
  res.render('profile-settings', { title: 'Express', loginUser: loginUser,  msg:'' }); 
});

router.post('/profile-settings',  checkLoginUser, function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');

  var FName = req.body.FName;
  var LName = req.body.LName;
  var DOB = req.body.DOB;
  var BloodGroup = req.body.BloodGroup;
  var  Email = req.body.Email;
  var MobileNo = req.body.MobileNo;
  var Address = req.body.Address;
  var City = req.body.City;
  var State = req.body.State;
  var Country = req.body.Country;

  var patientProfile=new patientProfileModel({
    FName:FName,
    LName:LName,
    DOB:DOB,
    BloodGroup:BloodGroup,
    Email:Email,
    MobileNo:MobileNo,
    Address:Address,
    City:City,
    State:State,
    Country:Country
  });
 patientProfile.save((err, doc) =>{
    if(err) throw err;
    res.render('profile-settings', { title: 'Express', loginUser: loginUser,  msg:'Data Saved Successfully.' });
 });

  
});



router.get('/doctor-register', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('/patient-dashboard');
  }else{
    res.render('doctor-register', { title: 'Express', msg:'' });
  }
  
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/adminDashboard', function(req, res, next) {
  
  getPatientProfile.exec(function(err,data){
    if(err) throw err;
    res.render('adminDashboard', { title: 'Express', records:data });
  });
});

router.post('/login', function(req, res, next) {
  //var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var checkEmail=patientUserModule.findOne({email:email});
  checkEmail.exec((err,data)=>{
    if(err)throw err;
    
    var getEmailId=data._id;
    var getPassword=data.password;
    if(bcrypt.compareSync(password,getPassword)){
      var token = jwt.sign({ emailId: getEmailId }, 'loginToken');
      localStorage.setItem('userToken', token);
      localStorage.setItem('loginUser', email);
      res.redirect('/profile-settings');
      // res.render('login', { title: 'Express', msg:'Logged In Successfully.' });
    }else{
      res.render('login', { title: 'Express', msg:'Invalid Password!' });
    }
    
  })
 
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express', msg:'' });
});

router.post('/register',checkEmail, checkUsername, function(req, res, next) {
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var conformPass=req.body.conformPass;

  if(password != conformPass){
    res.render('register', { title: '', msg:'Password not matching!!' });
  }else{
        password = bcrypt.hashSync(req.body.password, 10);

    var patientUserDetails=new patientUserModule({
      username:username,
      email:email,
      password:password
    });
   patientUserDetails.save((err, doc) =>{
      if(err) throw err;
      res.render('register', { title: '', msg:'User Registered Successfully ' });
   });
  }  
});

//Doctor Ssystem

function checkEmailDoc(req, res, next){
  var emailDoc=req.body.emailDoc;
  var checkexitsEmailDoc=doctorUserModule.findOne({emailDoc:emailDoc});
  checkexitsEmailDoc.exec((err, data)=>{
   if(err) throw err;
   if(data){
    return res.render('doctor-register', { title: '', msg:'Email Already Exists. Try another one.. ' });
   }
   next();
  })
}

function checkUsernameDoc(req, res, next){
  var usernameDoc=req.body.usernameDoc;
  var checkexitsUsernameDoc=doctorUserModule.findOne({usernameDoc:usernameDoc});
  checkexitsUsernameDoc.exec((err, data)=>{
   if(err) throw err;
   if(data){
    return res.render('register', { title: '', msg:'Username Already Exists. Try another one.. ' });
   }
   next();
  })
}

//Doctor-Register

router.get('/doctor-register', function(req, res, next) {
  res.render('doctor-register', { title: 'Express', msg:'' });
});

router.post('/doctor-register',checkEmailDoc, checkUsernameDoc, function(req, res, next) {
  var usernameDoc=req.body.usernameDoc;
  var emailDoc=req.body.emailDoc;
  var passwordDoc=req.body.passwordDoc;
  var confirmpassDoc=req.body.confirmpassDoc;

  if(passwordDoc != confirmpassDoc){
    res.render('doctor-register', { title: '', msg:'Password not matching!!' });
  }else{
        passwordDoc = bcrypt.hashSync(req.body.passwordDoc, 10);

    var doctorUserDetails=new doctorUserModule({
      usernameDoc:usernameDoc,
      emailDoc:emailDoc,
      passwordDoc:passwordDoc
    });
   doctorUserDetails.save((err, doc) =>{
      if(err) throw err;
      res.render('doctor-register', { title: '', msg:'User Registered Successfully ' });
   });
  }  
});

//Doctor Login system

function checkLoginDoc(req, res, next){
  var docToken = localStorage.getItem('docToken');
  try {
    var decoded = jwt.verify(docToken, 'loginDocToken');
  } catch(err) {
    res.redirect('/doctor-login');
  }
  next();   
}

//Get doctor Login
router.get('/doctor-login', function(req, res, next) {
  var loginDocUser=localStorage.getItem('loginDocUser');
  if(loginDocUser){
    res.redirect('/doctor-dashboard');
  }else{
    res.render('doctor-login', { title: 'Express', msg:'' });
  }  
});

router.get('/docLogout', function(req, res, next) {
  localStorage.removeItem('docToken');
  localStorage.removeItem('loginDocUser');
  res.redirect('/doctor-login');
});

//Get Doctor Profile
router.get('/doctor-dashboard',  checkLoginDoc, function(req, res, next) {
  var loginDocUser=localStorage.getItem('loginDocUser');
  res.render('doctor-dashboard', { title: 'Express', loginDocUser: loginDocUser,  msg:'' }); 
});

//Post Doctor Profile
router.post('/doctor-dashboard',  checkLoginDoc, function(req, res, next) {
  var loginDocUser=localStorage.getItem('loginDocUser');
  res.render('doctor-dashboard', { title: 'Express', loginDocUser:loginDocUser,  msg:'' });
});

router.post('/doctor-login', function(req, res, next) {
  //var username = req.body.username;
  var emailDoc = req.body.emailDoc;
  var passwordDoc = req.body.passwordDoc;
  var checkUsernameDoc=doctorUserModule.findOne({emailDoc:emailDoc});
  checkUsernameDoc.exec((err,data)=>{
    if(err)throw err;
    
    var getEmailId=data._id;
    var getPassword=data.passwordDoc;
    if(bcrypt.compareSync(passwordDoc,getPassword)){
      var token = jwt.sign({ emailId: getEmailId }, 'loginDocToken');
      localStorage.setItem('docToken', token);
      localStorage.setItem('loginDocUser', emailDoc);
      res.redirect('/doctor-dashboard');
      // res.render('login', { title: 'Express', msg:'Logged In Successfully.' });
    }else{
      res.render('doctor-login', { title: 'Express', msg:'Invalid Password!' });
    }    
  }) 
});

//Get Doctor Profile Settings
router.get('/doctor-profile-settings', function(req, res, next) {
  //localStorage.removeItem('docToken');
  var loginDocUser=localStorage.getItem('loginDocUser');
  res.render('doctor-profile-settings', { title: 'Express', loginDocUser:loginDocUser,  msg:'' });
});

//Post Doctor Profile Settings

router.post('/doctor-profile-settings', function(req, res, next) {
  var loginDocUser=localStorage.getItem('loginDocUser');

  // var uname = req.body.uname;
  // var emailid = req.body.emailid;
  var FirstName = req.body.FirstName;
  var LastName = req.body.LastName;
  var MobNo = req.body.MobNo;
  var Gender = req.body.Gender;
  var DateOfBirth = req.body.DateOfBirth;

  var RegistrationCouncil = req.body.RegistrationCouncil;
  var RegistrationNumber = req.body.RegistrationNumber;
  var RegistrationYear = req.body.RegistrationYear;

  var Degree = req.body.Degree;
  var Institute = req.body.Institute;
  var YearOfCompletion = req.body.YearOfCompletion;

  var HospitalName = req.body.HospitalName;
  var From = req.body.From;
  var To = req.body.To;
  var Designation = req.body.Designation;

  var services = req.body.services;
  var specialist = req.body.specialist;

  var PersonalAddress = req.body.PersonalAddress;
  var City = req.body.City;
  var PinCode = req.body.PinCode;
  var State = req.body.State;
  var Country = req.body.Country;

  // var rating_option = req.body.rating_option;
  // var custom_rating_count = req.body.custom_rating_count;

    var doctorProfile=new doctorProfileModel({
    
    // uname:uname,
    // emailid:emailid,
    FirstName:FirstName,
    LastName:LastName,
    MobNo:MobNo,
    Gender:Gender,
    DateOfBirth:DateOfBirth,

    RegistrationCouncil:RegistrationCouncil,
    RegistrationNumber:RegistrationNumber,
    RegistrationYear:RegistrationYear,

    Degree:Degree,
    YearOfCompletion:YearOfCompletion,


    HospitalName:HospitalName,
    Designation:Designation,

    services:services,
    specialist:specialist,


    PersonalAddress:PersonalAddress,
    City:City,
    PinCode:PinCode,
    State:State,   
        
  });
 doctorProfile.save((err, doc) =>{
    if(err) throw err;
    res.render('doctor-profile-settings', { title: 'Express', loginDocUser: loginDocUser,  msg:'Data Saved Successfully.' });
 });  
});

router.get('/adminDashboard', function(req, res, next) {
  
  getDoctorProfile.exec(function(err,data){
    if(err) throw err;
    res.render('adminDashboard', { title: 'Express', records:data });
  });
});
module.exports = router;
