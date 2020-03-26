const express = require('express');
const router = express.Router();
const Locations = require('../models/Location');
const Vehicles = require('../models/Vehicle');
const dbInstance = require('../config/db');
const Sequelize = require('sequelize');

router.get('/statistics/:selectedDay/:locID', (req, res) => {

    const query = `select HOUR(vehicleIn) as time, DATE(VehicleIn) as date, COUNT(*) as count FROM vehicles
    JOIN locations ON vehicles.locID = locations.locID
    WHERE locations.locID = :selectedLocationId and DAYNAME(vehicleIn) = :selectedDay
    GROUP BY HOUR(vehicleIn), DAY(vehicleIn)
    ORDER BY DATE(vehicleIn)`;

    
    dbInstance
    .query(query, {
        replacements: {
            selectedDay: req.params.selectedDay,
            selectedLocationId: req.params.locID
        },
        type: Sequelize.QueryTypes.SELECT
    }).then( (data) => {
        console.log(data)
        res.status(200)
                    .json(data);
    }).catch((error)=>{
        console.log(error)
        res.status(404)
                    .json(error);
                return;
    })
})

router.get('/:locID', (req, res) => {
    Locations.findOne({
        where: {
            locID: req.params.locID
        }
    })
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