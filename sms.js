require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendsms = async (body) => {
    try {
        const msg = await client.messages.create({
            from: '+12515806574',
            to: '+9779868997339',
            body
        });
        console.log("Message sent to user");
    } catch (error) {
        console.log(error);
    }
}
function send(){
  sendsms("Hello sir");
}
const date = new Date("2024-04-22T20:26:00.000+5:45");
const schedule = require('node-schedule');

const job = schedule.scheduleJob(date,send);
