// Importing the required module
require("dotenv").config();
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendsms = async (msg_data, number) => { // Accepts `number` as an argument
  try {
    const msg = await client.messages.create({
      from: '+12515806574',
      to: `+977${number}`,
      body: msg_data
    });
    console.log("Message sent to user");
  } catch (error) {

    console.log(error);
  }
}

let selectedMsg, selectedDate, selectedNumber;
app.use(express.urlencoded({extended:true}));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'front.html'));
});
app.post('/', (req, res) => {

  selectedMsg = req.body["message"];
  selectedDate = new Date(req.body["getDate"]);
  selectedNumber = req.body["num"];

  res.send(`The sent message : ${selectedMsg}<br>Date: ${selectedDate} <br> Sent to :${selectedNumber}`);
  scheduledJob();

})


function scheduledJob() {
  const cronExpression = `${selectedDate.getMinutes()} ${selectedDate.getHours()} ${selectedDate.getDate()} ${selectedDate.getMonth() + 1} *`; 
  

  cron.schedule(cronExpression, () => {

      sendsms(selectedMsg, selectedNumber);


  });
}

app.listen(2000);
