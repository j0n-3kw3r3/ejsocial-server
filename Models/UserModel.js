const mongoose = require('mongoose');


const User = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 3,
            max: 20,
            unique:true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique:true,
        },
        password: {
            type: String,
            required: true,
            max: 6,
        },
        profilePicture:{
          type: String,
          default:''
        },
        coverPicture:{
          type: String,
          default:''
        },
        desc:{
          type: String,
          max:50
        },
        city:{
          type: String,
          max:50
        },
        from:{
          type: String,
          max:50
        },
      relationship:{
          type: Number,
          enum: [1, 2, 3]
        },
        followers:{
          type:Array,
          default:[]
        },
        followings:{
          type:Array,
          default:[]
        },
        isAdmin:{
          type:Boolean,
          default:false,
        },
        online:{
          type:Boolean,
          default:false,
        },

    },
    {
      timestamps:true
    }
);

module.exports = mongoose.model('User', User)
