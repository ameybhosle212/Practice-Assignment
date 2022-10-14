const route = require('express').Router()
const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your email',
    pass: 'your password'
  }
});



route.post("/register",async(req,res)=>{
    const {name , email , password } = req.body;
    const isUserExists = await User.findOne({'email':email})
    if(!isUserExists){
        const salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = new User({
            'name':name,
            'email':email,
            'password1':password,
            'passwordEncrypted':hash
        })
        newUser.save()
        let token = jwt.sign({'id':newUser._id},'secretToken')
        var mailOptions = {
            from: 'Your Emial',
            to: email,
            subject: 'Verify Your Email',
            html: `<h1>Please Verify Your MEmail</h1><p>Link is http://localhost:3000/verify/${token}</p>`      
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        return res.json({
            'msg':'User Created',
            'error':null,
            'status':'ok'
        })
    }return res.json({
        'error':'User Exists',
        'status':'error'
    })
})

route.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    await User.findOne({'email':email}).then(user =>{
        if(!user.verified){
            return res.json({'status':'error','msg':'User Not Verified Please Verify and Then Log In'})
        }
        if(user){
            let isTrue = bcrypt.compareSync(password, user.passwordEncrypted); 
            if(isTrue){
                let token = jwt.sign({'id':user._id},'secretToken')
                return res.json({'token':token,'error':null,'status':'ok'})
            }return res.json({'status':'error','msg':'User Doesnot Exsist'})
        }return res.json({'msg':'User Not Found','status':'error'})
    })
})

route.post("/verify",async(req,res)=>{
    const token = req.body.token;
    let ifItExists = jwt.verify(token , 'secretToken')
    if(ifItExists){
        await User.findById(ifItExists.id).then(user =>{
            if(user && user.verified === false){
                user.verified = true;
                user.save()
                return res.json({'msg':'User Verified','error':null,'status':'ok'})
            }else{
                return res.json({'msg':'User is already verified','error':null,'status':'ok'})
            }
        })
    }
})

module.exports = route;