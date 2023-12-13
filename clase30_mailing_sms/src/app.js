import express from 'express'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import __dirname from './utils.js'


const TWILIO_ACCOUNT_SID = 'ACd5ae84527483081d485342c931ff9787'
const TWILIO_AUTH0_TOKEN = '3b13487fd8d3770a0b3e55d765069b70'
const TWILIO_SMS_NUMBER = '+16698001142'

const app = express()
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'r2coderhouse@gmail.com',
        pass: 'kbaxarttuscyldqn'
    }
})

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH0_TOKEN)

app.get('/sms', async(req, res) => {
    const result = await client.messages.create({
        body: `Batma is my favorite movie`,
        from: TWILIO_SMS_NUMBER,
        to: '+573054004683'
    })

    console.log(result)
    res.send('SMS sent! ')
})

app.get('/mail', async(req, res) => {
    const result = await transport.sendMail({
        from: 'r2coderhouse@gmail.com',
        to: 'r2coderhouse@gmail.com',
        subject: 'Francisco Elder Rules !!',
        html: `
            <div>
                <h1> Everything everywhere all at once</h1>
                <img src="cid:image2" />
            </div>
        `,
        attachments: [
            {
                filename: 'image1.jpg',
                path: __dirname + '/images/image1.jpg',
                cid: 'image1'
            },
            {
                filename: 'image2.jpg',
                path: __dirname + '/images/image2.jpg',
                cid: 'image2'
            }
        ]
    })

    console.log(result)
    res.send(`Email sent! 😎`)
})

app.listen(8080, () => console.log(`Listening 🏃💨....`))