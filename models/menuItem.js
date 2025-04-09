const mongoose = require('mongoose');


const menuItem = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour']
    },
    category:{
        type:String,
        enum:['starter','main course','dessert'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

//creating menuItem model

const MenuItem = mongoose.model('MenuItem', menuItem);

module.exports = MenuItem;