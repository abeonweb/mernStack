const express = require('express')
const router = express.Router()
const path = require('path')

//moved from server.js

//express automatically sets status code and content type
router.get('^/$|/index(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router