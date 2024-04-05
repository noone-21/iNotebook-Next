// import nodemailer from 'nodemailer'


// export default async function sendEmail(email, otp) {
//   try {
//     var transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: "92fb506b1c0f20",
//         pass: "4eba5e1f0d23cf"
//       }
//     });


//     const info = await transport.sendMail({
//       from: 'da.techscale@gmail.com', // sender address
//       to: email, // list of receivers
//       subject: "RESET PASSWORD", // Subject line
//       text: `OTP for Verification`, // plain text body
//       html: `<p>Your 4 digit OTP for Verification is <b>${otp}</b></p>`, // html body
//     });


//   } catch (error) {
//     throw new Error(error.message)
//   }
// }


