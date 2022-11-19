const fs = require('fs');
const rfs = require('rotating-file-stream'); 
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db:'socialsApp_development',
    smtp: { 
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ankitanandjha71@gmail.com',
            pass: 'BoomBoom71'
            }
    },
        google_client_id: "935358475069-2c5bkkb15jhvkpgvd3if25dmd5ek0d4q.apps.googleusercontent.com",
        google_client_secret: "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",
        google_call_back_url: "http://localhost:8000/users/auth/google/callback",
        jwt_secret: 'socialsApp',
        morgan: {
            mode: 'dev',
            options: {stream: accessLogStream}
        }
}


const production = {
    name: 'production', 
    asset_path: process.env.SOCIALSAPP_ASSET_PATH,
    session_cookie_key: process.env.SOCIALSAPP_SESSION_COOKIE_KEY,
    db: process.env.SOCIALSAPP_DB,
    smtp: { 
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALSAPP_GMAIL_USERNAME,
            pass: process.env.SOCIALSAPP_GMAIL_PASSWORD
            }
    },
        google_client_id: process.env.SOCIALSAPP_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.SOCIALSAPP_GOOGLE_CLIENT_SECRET,
        google_call_back_url: process.env.SOCIALSAPP_GOOGLE_CALLBACK_URL,
        jwt_secret: process.env.SOCIALSAPP_JWT_SECRET,
        morgan: {
            mode: 'combined',
            options: {stream: accessLogStream}
        }
}




module.exports = development;