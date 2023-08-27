const express = require('express')

const router = express.Router()


const shortURL = require('../models/urlschema')


router.get('/', async (req, res) => {
    // res.render('index')

    const shorturls = await shortURL.find()
    res.render('index', { shorturls: shorturls })
})

router.post('/shortUrls', async (req, res) => {


    const url = req.body.full
    const newShortURL = new shortURL({
        full: url
    })
    await newShortURL.save()
    console.log('created', newShortURL)

    res.redirect('/')

})



router.get('/:shortUrl', async (req, res) => {
    const shortUrl = await shortURL.findOne({ short: req.params.shortUrl })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }


    await shortUrl.clicks++;
    shortUrl.save()
    res.redirect(shortUrl.full);

})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id
    /// res.send(id)

    try {
        await shortURL.deleteOne({ _id: id })
        console.log('delete');
        res.redirect('/')

    } catch (err) {
        console.log(err);
    }

})

module.exports = router