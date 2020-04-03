const sgMail = require('@sendgrid/mail');

export default async function(req, res) {
  sgMail.setApiKey(process.env.STKILDA_SENDGRID);

  const {targetEmail, message} = req.body;

  const table = Object.entries(message)
    .map(
      ([key, value]) =>
        `<tr><td>${key}</td> <td>${
          typeof value === 'object'
            ? `<ul>${value.map(item => `<li>${item}</li>`).join('')}</ul>`
            : value
        }</td></tr>`
    )
    .join('');

  const emailText = `
    Hi Luke!\nA new form submission has arrived. Please see the details below.\n ${JSON.stringify(
      message
    )}
    `;

  const emailBody = `
    <p>Hi Luke!</p>
    <p>A new form submission has arrived. Please see the details below.</p>
    <table>
    ${table}
    </table>
    `;

  const content = {
    to: targetEmail,
    from: message.email,
    subject: `[no-reply] New form submission from ${message.name}`,
    text: emailText,
    html: `<p>${emailBody}</p>`
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
}
