const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  sgMail.send({
    to: email,
    from: 'denisdubov88@gmail.com',
    subject: 'Welcome to my service',
    text: `Hi ${name}, welcome to the app!`
  });
}
const sendCanceledEmail = async (email, name) => {
  sgMail.send({
    to: email,
    from: 'denisdubov88@gmail.com',
    subject: 'Welcome to my service',
    text: `Goodbye ${name}, i hope that you comeback later!`
  });
}
module.exports = {
  sendWelcomeEmail,
  sendCanceledEmail
}