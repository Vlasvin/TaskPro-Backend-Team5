const sgMail = require("@sendgrid/mail");
const { ctrlWrapper } = require("../helpers");

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

const sendEmail = async (req, res) => {
  const { email, message } = req.body;

  const msg = {
    to: "taskpro.project@gmail.com",
    from: "vlasiki@gmail.com",
    subject: "Help Request",
    text: `Email address: ${email}\n\n${message}`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = { sendEmail: ctrlWrapper(sendEmail) };
