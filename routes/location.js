const express = require('express');
const router = express.Router();
const Locations = require('../models/Location');

router.get('/', (req, res) => {
    Locations.findAll()
            .then( (locations) => {
                res.status(200)
                    .json(locations);
            })
            .catch( (err) => {
                res.status(404)
                    .json(err);
                return;
            })
})

router.delete('/delete-location/:locID', (req, res) => {
    if(req.params.locID) {
        Locations.destroy({
            where: {
                locID: req.params.locID
            }
        }).then( () => {
            res.status(200)
                .json(null);
        }).catch( (err) => {
            res.status(404)
                .json(err);
        })
    } else {
        res.status(404)
            .json({'message': 'No location id'})
    }
    
})

router.put('/update-location/:locID', (req, res) => {
    if(req.params.locID) {
        Locations.update({
            locName: req.body.locName,
            locDesc: req.body.locDesc,
            numOfSlots: req.body.numOfSlots,
            numOfDisabledSlots: req.body.numOfDisabledSlots,
            numOfReserved: req.body.numOfReserved,
            speedLimit: req.body.speedLimit,
            locStatus: req.body.locStatus,
            availableSlots: req.body.availableSlots,
            parkingCharge: req.body.parkingCharge
        }, {
            where: {
                locID: req.params.locID
            }
        }).then( (response) => {
            res.status(200)
                .json(response);
        }).catch( (err) => {
            res.status(404)
                .json(err)
        })
    } else {
        res.status(404)
            .json({'message': 'No location id'})
    }
})


router.post('/create-location', (req, res) => {
    Locations.create( {
        locName: req.body.locName,
        locDesc: req.body.locDesc,
        numOfSlots: req.body.numOfSlots,
        numOfDisabledSlots: req.body.numOfDisabledSlots,
        numOfReserved: req.body.numOfReserved,
        speedLimit: req.body.speedLimit,
        locStatus: req.body.locStatus,
        availableSlots: req.body.availableSlots,
        parkingCharge: req.body.parkingCharge
    }).then( (response) => {
        res.status(200)
            .json(response);
    }).catch( (err) => {
        res.status(404)
            .json(err)
    })
})


module.exports = router;