const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save',async function(next){
    const person = this;

    if(!person.isModified('password')){
        return next();
        //agar password modify(change) huva toh person.isModified--->hume true return kargea but jab bhi modify hota hain usse hum hash main convert karna hota hain aur ye if hashing ko skip karata hain >>>toh agar modify huva toh TRUE return karega aur uska "!" FALSE kar dega jisse hashing skip nhi hogi >>>aur kise din modify nhi huva(email ya phone number change huva) toh ye FALSE return karega aur "!" TRUE kar dega jisse ye hashing skip ho jayegi...
        }
        //ye check karta hain ke kya password ko change ya modify kiya hain kya....agar kiya toh password ko hash karo -------> agar nhi change (kuch aur change kiya jaise email ya phone number) toh sidha next() call karo koi hashing nhi karne hain..
    try {
        const salt  = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(person.password,salt);
        console.log("password before hashing",person.password);
        const hashPassword = await bcrypt.hash(person.password,salt);
        console.log("password after hashing",hashPassword);
        
        //await lagana isliye jararui hota hain kyuki ye function hume promise return karta hain jiski value undefined hoti hain...isliye hum await lagte hain taki value mil paye
        //async function always return a promise 

        person.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

//how this bcrypt compare password after converting plain password into hash password
//agar aapne plain password diya :- 
//sunil ------> cuhnuuisnchfaifvnufnwhnfuwehfnveiowqhcnoqwinfe(this hash password contains salt and plain password) aur ab ye hash password db main store hoga

//now when user again login using this password
//cuhnuuisnchfaifvnufnwhnfuwehfnveiowqhcnoqwinfe-----> extract salt fron this salt
//extracted salt + give password(let say sunil) ------> ab phirse ye hash password generate karega agar ye newly generate hash password aur vo stored hash password same huva toh login ho jayega...


//creating person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;