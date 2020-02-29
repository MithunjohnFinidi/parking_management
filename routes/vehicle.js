const express = require('express');
const router = express.Router();
const Vehicles = require('../models/Vehicle');
const Locations = require('../models/Location');
const Sequelize = require('sequelize');

router.get('/', (req, res) => {
    Vehicles.findAll()
            .then( (vehicles) => {
                res.status(200)
                    .json(vehicles);
            })
            .catch( (err) => {
                console.log(err)
            })
})

router.delete('/delete-vehicle/:vehicleID', (req, res) => {
    Vehicles.destroy({
        where: {
            vehicleID: req.params.vehicleID
        }
    }).then( () => {
        res.status(200)
            .json(null);
    }).catch( (err) => {
        console.log(err);
    })
})

router.put('/update-vehicle/:vehicleID', (req, res) => {
    Vehicles.update({
        licenseNo: req.body.licenseNo,
        locID: req.body.locID,
        model: req.body.model,
        ownerName: req.body.ownerName,
        color: req.body.color,
        vehicleIn: req.body.vehicleIn,
        vehicleOut: req.body.vehicleOut,
        vehicleStatus: req.body.vehicleStatus,
        parkingCharge: req.body.parkingCharge
    }, {
        where: {
            vehicleID: req.params.vehicleID
        }
    }).then( () => {
        res.status(200)
            .json("success");
    }).catch( (err) => {
        console.log(err);
    })
})


router.post('/create-vehicle', (req, res) => {
    Vehicles.create( {
        licenseNo: req.body.licenseNo,
        locID: req.body.locID,
        model: req.body.model,
        ownerName: req.body.ownerName,
        color: req.body.color,
        vehicleIn: req.body.vehicleIn,
        vehicleOut: req.body.vehicleOut,
        vehicleStatus: req.body.vehicleStatus,
        parkingCharge: req.body.parkingCharge
    }).then( (response) => {
        Locations.update({
            availableSlots: Sequelize.literal('availableSlots - 1')   
        }, {
            where: {
                locID: response.locID
            }
        }).then( (response) => {
            res.status(200)
                .json(response);
        }).catch( (err) => {
            console.log(err);
        })
        
    }).catch( (err) => {
        console.log(err);
    })
})


module.exports = router;