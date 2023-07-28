const express = require('express')
const mongoose = require("mongoose")

const app = express()

const PORT = process.env.PORT || 3000




mongoose.connect("mongodb+srv://urlshrink:urlshrink@cluster0.svsyg2g.mongodb.net/urlshrinker?retryWrites=true", {
    //     useNewUrlParser: true,
    //    // useCreateIndex: true,
    //     useUnifiedTopology: true,
    //     //useFindAndModify: false
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