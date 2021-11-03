const dotenv = require('dotenv');
let envFile = null
if (process.env.NODE_ENV) {
    console.log('%cindex.js line:4 process.env.NODE_ENV', 'color: #007acc;', process.env.NODE_ENV);
    // let path = `${__dirname}/.env.${process.env.NODE_ENV}`;
    // console.log('%cindex.js line:6 path', 'color: #007acc;', path);
    envFile =dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
    console.log('%cindex.js line:6 process.env.MONGOOSE_URL', 'color: #007acc;', process.env.MONGOOSE_URL);
    if (!envFile) throw `.env.${process.env.NODE_ENV} not found`
}
else {
    envFile = dotenv.config()
    console.log('%cindex.js line:13 envFile.TEST', 'color: #007acc;', process.env.MONGOOSE_URL);
    if (!envFile) throw `.env not found`
}
const config = {
    database: {
        mongoose_url: process.env.MONGOOSE_URL,
        password: process.env.PASSWORD
    }
}
module.exports = config;