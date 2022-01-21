const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anamikash27@gmail.com',
        subject: 'Thanks for joining in!!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendCancellationMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anamikash27@gmail.com',
        subject: 'Leaving out so early!!',
        text: `No problem ${name}`
    })
}


module.exports = {
    sendWelcomeMail,
    sendCancellationMail
}