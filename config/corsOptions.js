//third party middleware cors: cross origin resource sharing
const allowedOrigins = require('./allowedOrigins')
//whatever domain that will access this domain and variations
//remember to remove unwanted domains from whitelist
const corsOptions = {
    origin: (origin, callback)=>{
        if (allowedOrigins.indexOf(origin) != -1 || !origin) {//remove !origin after development
            callback(null, true)//1st param is error ie null is no error
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions