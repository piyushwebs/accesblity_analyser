require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();


app.use(cors());
app.use(express.json());

const routes = require("./routes/routes");

app.use("/api",routes);

const port = process.env.port || 1102;
const mongo_url = process.env.mongo_url;


const connectDb = async () =>{
  try{
    await mongoose.connect(mongo_url),
    console.log("MongoDB connected succesfully!!");
  }
  catch(err){
    console.log("MongoDB connection failed",err.message);
    process.exit(1);
  }
}


connectDb();

app.listen(port,()=>{
  console.log(`Server is running on ${port}`);
})
