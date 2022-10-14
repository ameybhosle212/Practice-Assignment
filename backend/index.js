const express = require("express")
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/assignmnet124").then(()=>{
    console.log("DB CONNECTED")
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/",require("./routes/index"))

app.listen(1200,()=>{
    console.log("Server at 1200");
})