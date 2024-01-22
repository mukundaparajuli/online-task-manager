const nodemailer = require("nodemailer");
const User = require("../Models/userModel")

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
    const { name, email } = req.body;
    const user = await User.find({ email: email })
    if (user) {
        res.send("User Already exists");
    }
    else {

        const message = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        try {
            const info = await transporter.sendMail(message)
            console.log(info);
            res.status(200)
            res.json(info)
        } catch (error) {
            console.log(error);
        }
    }
    next();
}

module.exports = nodeMailer;