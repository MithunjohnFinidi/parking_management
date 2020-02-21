const express = require('express');
const router = express.Router();
const Bookings = require('../models/Booking');

router.get('/', (req, res) => {
    Bookings.findAll()
            .then( (bookings) => {
                res.send(bookings);
                res.status(200);
            })
            .catch( (err) => {
                console.log(err)
            })
})

router.delete('/delete-booking/:bookingID', (req, res) => {
    Bookings.destroy({
        where: {
            bookingID: req.params.bookingID
        }
    }).then( () => {
        res.status(200);
    }).catch( (err) => {
        console.log(err);
    })
})

router.put('/update-booking/:bookingID', (req, res) => {
    Bookings.update({
        locID: req.body.locID,
        booking: req.body.booking,
        licenseNumber: req.body.licenseNumber,
        personName: req.body.personName,
    }, {
        where: {
            bookingID: req.params.bookingID
        }
    }).then( () => {
        res.status(200);
    }).catch( (err) => {
        console.log(err);
    })
})


router.post('/create-booking', (req, res) => {
    Bookings.create( {
        locID: req.body.locID,
        booking: req.body.booking,
        licenseNumber: req.body.licenseNumber,
        personName: req.body.personName,
    }).then( (response) => {
        res.status(200);
    }).catch( (err) => {
        console.log(err);
    })
})


module.exports = router;