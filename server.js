const express = require('express')
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT || 3000




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

const db = mongoose.connection;

db.on('error', () => {
    console.log('error');
})

db.once('open', () => {
    console.log('establish done');
})


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//link route
const urlRouter = require('./routes/urlroute')


app.use('/', urlRouter)




app.listen(PORT, () => {
    console.log('listening ')
})