const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

//static method for signup
UserSchema.statics.signup = async function(firstname,lastname,phonenumber,email,gender,password,passwordconfirm){

    //validations
    if(!firstname || !lastname || !phonenumber || !email || !gender || !password || !passwordconfirm){
        throw Error("All fields must be filled");
    }

    if(!validator.isEmail(email)){
        throw Error("Email entered is invalid");
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Please enter a strong password");
    }
    if(phonenumber.length < 10 || phonenumber.length > 13){
        throw Error("Please enter a valid phone number");
    }

    if(!(password === passwordconfirm)){
        throw Error("Passwords don't match")
    }

    const emailexists = await this.findOne({email});
    if(emailexists){
        throw Error("Email already exists");
    }
    const phonenumberexists = await this.findOne({phonenumber});
    if(phonenumberexists){
        throw Error("Phone number already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = this.create({firstname,lastname,phonenumber,email,gender,password:hash });

    return user;
}

UserSchema.statics.login = async function (email,password){
    //validations
    if(!email || !password){
        throw Error("Both fields must not be empty");
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error("Incorrect password");
    }

    return user

}

module.exports = mongoose.model('User',UserSchema);