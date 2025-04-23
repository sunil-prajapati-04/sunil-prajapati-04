const passport = require('passport');//ye passport ko require kiya hain jo authentication ke liye use hota hain
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');



passport.use(new LocalStrategy(async(username,password,done)=>{
    try {
        console.log("recevied credentials",username,password);
        
        const user = await Person.findOne({username});
        // console.log("user form db",user);
        
        if(!user){
            return done(null,false,{message:"user not found"});
        }
        const isPasswordMatch = await user.comparePassword(password);
        // console.log("password match",isPasswordMatch);
        
        if(isPasswordMatch){
            return done(null ,user);
        }else{
            return done(null ,false,{message:"password is incorrect"});
        }
    } catch (error) {
       return done(error);
    }
}));

module.exports = passport;