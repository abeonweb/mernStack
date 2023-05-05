require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path') 
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const credentials = require('./middleware/credentials')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;

//connect to mongoDB
connectDB()
//Middleware

//custom middleware logger
app.use(logger)

//Handle options credentials check - before CORS!
//and fetch cookies credentials requirement
app.use(credentials)

//cross origins resource sharing (CORS)
app.use(cors(corsOptions))


//bult-in middleware to handle urlencoded data
//in other words, form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}))

//built-in middleware for json
app.use(express.json())


app.use(cookieParser())

//built-in middleware for static files
app.use(express.static(path.join(__dirname, '/public')))

//serve static files for subdirectory

//routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'))
//use all to give 404 treatment to everything that arrives here
app.all('*', (req, res) => {
    //as the 404.html was found, express will send 200
    //chain 'status' to send correct code
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')){
        res.json({error: "404 Not Found"})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//custom error handling should come after everything
app.use(errorHandler)

//listen for requests only when DB is connected
mongoose.connection.once('open', () =>{
    console.log('connected to mongoDB')
    //always at end of file
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)) 
})