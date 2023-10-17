import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (req, res) => {

    const { name, phone } = req.body;

    if(!name || !phone) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {

        const mailTransporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, 
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })

        let mailDetails = {
            from: process.env.USER_MAIL,
            to: process.env.SENDER_MAIL,
            subject: 'Test mail',
            text: `This is a test mail used as a request call back. Here are the credentials.
            Name: ${name}
            Phone: ${phone}`
        };

        await mailTransporter.sendMail(mailDetails, (err) => {
            if(err){
                console.log(err, "error occured")
                res.status(400).json({ error: err })
            }else {
                res.status(200).json({ message: "Mail Sent" })
            }
        })

    }catch(e){
        console.log(e);
        res.status(400).json({ message: e })
    } 

}