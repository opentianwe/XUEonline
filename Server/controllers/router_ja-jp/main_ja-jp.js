const express = require('express')
const route = express.Router()
const views_path = 'japanese_views/public_views/'

route.get("/", (req, res) => {
    
    res.render(views_path + 'index.art')
})



module.exports = route