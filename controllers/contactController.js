const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  const { name, email, project } = req.body;

  if (!name || !email || !project) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MY_EMAIL,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nProject: ${project}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};
