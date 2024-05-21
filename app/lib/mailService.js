
import nodemailer from 'nodemailer';
import { WelcomeTemplate } from './template/welcome';


export const sendMail = async ({to,subject, name,password,status,link}) => {
    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    })

    try{
        await transport.verify()
        // console.log(testResult)
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to send email!");
    }

    try{
        await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject: subject,
            html: WelcomeTemplate(name,password,status,link)
        })

        // console.log(sendResult)

        return {status : "success"};
    }
    catch(err){
        console.log(err)
        throw new Error("Failed to send email!");
    }
      
} 

  
  

