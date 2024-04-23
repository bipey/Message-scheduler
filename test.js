let selectedDate,selectedMsg,selectedTime,selectedNumber;
const express=require('express');
const path = require('path');
const app= express();
app.use(express.urlencoded());
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'front.html'));
  });
  app.post('/',(req,res)=>{
    selectedDate=req.body["getDate"];
    selectedMsg=req.body["message"];
    selectedTime=req.body["getTime"];
    selectedNumber=req.body["num"];
    res.send(selectedDate+" "+selectedMsg+" "+selectedTime+" "+selectedNumber);
    console.log(selectedDate+" "+selectedMsg+" "+selectedTime+" "+selectedNumber);
    
  })
app.listen(2000);