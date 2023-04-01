const express = require ("express");
const app = express();
const bodyparser =require("body-parser");
const nodemailer=require("nodemailer");
app.get("/",function(req,res){
res.sendFile(__dirname+ "/index.html");
console.log(__dirname);
})
app.use(bodyparser.urlencoded({extended: true}));
app.post("/", function(req,res){
    const comm=req.body.message;
    const nm=req.body.name;
    const em=req.body.email;
    console.log(comm);
    console.log(nm);
    console.log(em);
    var transpoter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: 'prehansgupta@gmail.com',
            pass:'wprcbjgdegyxrqiw',  
        }
    })
    var mailOptions ={
        from :'prehansgupta@gmail.com',
        to:req.body.name,
        cc:'prehansgupta@gmail.com',
        subject:'Message from '+nm,
        text: comm,
        
    };
    transpoter.sendMail(mailOptions,function(error,info){
        if(error){
        console.log(error);
        }
        else{
       res.send('<h1 style="color: green" >Thank You, Message has been Sent.');
        }
    })  
})
app.listen(3000,function(){
    console.log("server started at 3000");
});
