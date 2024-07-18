import nodemailer from "nodemailer";



export const sendEmail = async(email , sub ,  html)=>{
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      service:"gmail",
      secure: true,
        auth: {
          user: "shahdmetwaly97@gmail.com",
          pass: "diksevrbueouwtck",
        },
        tls: {
          rejectUnauthorized: false,
      }
      });

      async function main() {
      
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <shahdmetwaly97@gmail.com>',
          to: email, 
          subject: sub, 
          html: html, 
        });
      
        console.log("Message sent: %s", info.messageId);
      }
      
      main().catch(console.error);
}


