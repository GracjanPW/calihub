import transporter from "./transporter";

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    let mailOptions = {
        from: '"Calihub" <your-email@gmail.com>', // Sender address
        to: email, // List of recipients
        subject: 'Password Reset', // Subject line
        text: 'This is a plain text body', // Plain text body
        html: `<b>Reset here: <a href="${resetLink}">Link<a/></b>`, // HTML body
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error occurred:', error);
        }
        console.log('Email sent: %s', info.messageId);
      });
}

export async function sendTwoFactorToken(email: string, token: string) {
    let mailOptions = {
        from: '"Calihub" <your-email@gmail.com>', // Sender address
        to: email, // List of recipients
        subject: 'Password Reset', // Subject line
        text: 'This is a plain text body', // Plain text body
        html: `<b>Two factor token for ${email}: ${token}</b>`, // HTML body
      };
      
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error occurred:', error);
        }
        console.log('Email sent: %s', info.messageId);
      });
    console.log(`Two factor token for ${email}: ${token}`);
}


export function sendVerificationEmail(email:string,token:string){
    const verficationUrl = `http://localhost:3000/auth/verify-email?token=${token}`
    let mailOptions = {
        from: '"Calihub" <your-email@gmail.com>', // Sender address
        to: email, // List of recipients
        subject: 'Email Verification', // Subject line
        text: 'This is a plain text body', // Plain text body
        html: `<b>Verify here: <a href="${verficationUrl}">Link<a/></b>`, // HTML body
      };
      
      // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error occurred:', error);
        }
        console.log('Email sent: %s', info.messageId);
      });
}