'use server';
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kpparekh8360@gmail.com',
        pass: 'ngxy mfxf ohaj fzuf'
    }
});
type dataProps = {
    _id: string
    phoneNumber: string
    email: string
    hobbies: string[]
}
export const sendData = (data: dataProps[]) => {

    var mailOptions = {
        from: 'kpparekh8360@gmail.com',
        to: 'info@redpositive.in',
        subject: 'Data from Coding Project',
        text: JSON.stringify(data)
    };

    transporter.sendMail(mailOptions, function (error:Error, info:any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}