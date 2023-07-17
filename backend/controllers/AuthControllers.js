const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{ expiresIn: "3d" });
}

const handleSignUp = async(req,res) =>{
    const {firstname,lastname,phonenumber,email,gender,password,passwordconfirm} = req.body;

    try {
        const user = await User.signup(firstname,lastname,phonenumber,email,gender,password,passwordconfirm);
        if(user){
            //create the user token
            const token = createToken(user._id);
            //create transport
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });

            //define email options
            const mailOptions = {
                from: 'QuickBuy <aina.isaac2002@gmail.com>',
                to: 'aina.isaac2002@gmail.com',
                subject: 'Account Registration',
                text: 'Thank you for creating an account with us, please have an amazing experience'
            };

            //send the email
            transporter.sendMail(mailOptions, function(error,info){
                if(error){
                    console.log(error);
                }else{
                    console.log("Email sent successfully" + info);
                }
            })
            res.status(200).json({firstname,email,user,token});
        }else{
            res.status(400).json({error:"Failed to register new user"});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

const handleLogin = async(req,res) =>{
    const {email,password} = req.body;

    try {
        const user = await User.login(email,password);
        if(user){
            const token = createToken(user._id)
            res.status(200).json({ email, user ,token });
        }else{
            res.status(400).json({error:"Failed to login the user"});
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports={
    handleSignUp,handleLogin
}