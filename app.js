// Importing the required modules
require("dotenv").config();
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const moment = require('moment-timezone'); // Import moment-timezone
const app = express();

// Getting the required credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Function to send SMS
const sendsms = async (msg_data, number) => {
  try {
    const msg = await client.messages.create({
      from: '+13183512905',
      to: `+977${number}`,
      body: msg_data
    });
    console.log("Message sent to user");
  } catch (error) {
    console.log(error);
  }
}

// Transfering the data from the form to the backend
let selectedMsg, selectedDate, selectedNumber;
app.use(express.urlencoded({extended:true}));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'front.html'));
});
app.post('/', (req, res) => {
  selectedMsg = req.body["message"];
  selectedDate = new Date(req.body["getDate"]);
  selectedNumber = req.body["num"];
  const serverTimeZone = moment.tz.guess(); // Get server's local time zone
  res.send(`The sent message: ${selectedMsg}<br>Date: ${moment(selectedDate).tz(serverTimeZone).format('YYYY-MM-DD HH:mm:ss')} <br>Sent to: ${selectedNumber}`);
  scheduledJob(); // Only schedule the job if the number is valid
});

// Schedule the job
function scheduledJob() {
  const cronExpression = `${selectedDate.getMinutes()} ${selectedDate.getHours()} ${selectedDate.getDate()} ${selectedDate.getMonth() + 1} *`; 
  cron.schedule(cronExpression, () => {
    sendsms(selectedMsg, selectedNumber);
  });
}

// Start the server
app.listen(process.env.PORT || 8000);
