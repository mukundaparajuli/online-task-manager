const nodemailer = require("nodemailer");
const User = require("../Models/userModel");

const nodeMailer = async (req, res, next) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'flavio37@ethereal.email',
            pass: 'j2tCzBukhCBE1fuTpz'
        }
    });

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400)
            throw new Error("All fields are mandatory to be filled!");
        }
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400)
            throw new Error("User already exists!");
        } else {
            // User doesn't exist, send email
            const message = {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            };

            const info = await transporter.sendMail(message);
            console.log(info);
            res.status(200).json(info);
        }
    } catch (error) {
        console.log(error);
    }
    next();
};

module.exports = nodeMailer;
