const mongoose = require("mongoose");


const scanSchema = new mongoose.Schema({
  url:{
    type:String,
    required:true
  },
  summary:{
    passes:Number,
    violations:Number,
    inapplicable:Number,
    timestamp:String
  },
  violations:[
    {
      id:String,
      impact:{
        type:String,
        default:null
      },
      description:String,
      help:String,
      helpUrl:String
    }
  ],
  passes:[
   {
    id:String,
    description:String,
   }
  ],
  rawResult:{
    type:Object
  },
  //These is for future if we use Auth in these app
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:false
  }
},
{
  timestamps:true
});

module.exports=mongoose.model("Scan",scanSchema);