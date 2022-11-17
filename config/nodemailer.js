const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ankitanandjha71@gmail.com',
        pass: 'BoomBoom71'
    }
});

let renderTemplete = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return;}

            mailHTML = template;
        }
    )
}

module.exports = {
    transporter: transporter,
    renderTemplete: renderTemplete
}