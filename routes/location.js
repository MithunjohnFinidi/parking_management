const express = require('express');
const router = express.Router();
const Locations = require('../models/Location');

router.get('/', (req, res) => {
    Locations.findAll()
            .then( (locations) => {
                res.send(locations);
            })
            .catch( (err) => {
                console.log(err)
            })
})

router.delete('/delete-location/:locID', (req, res) => {
    Locations.destroy({
        where: {
            locID: req.params.locID
        }
    }).then( () => {
        console.log("Done");
    }).catch( (err) => {
        console.log(err);
    })
})

router.post('/create-location', (req, res) => {
    Locations.create( {
        locName: "test",
        locDesc: " test",
        numOfSlots: 10,
        numOfDisabledSlots: 2,
        numOfReserved: 2,
        speedLimit: "20km/hr",
        locStatus: "open",
        availableSlots: 3,
        parkingCharge: 10
    }).then( (response) => {
        console.log("Location created:", response.locID);
    }).catch( (err) => {
        console.log(err);
    })
})


module.exports = router;