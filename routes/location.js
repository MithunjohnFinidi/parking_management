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
 //

module.exports = router;