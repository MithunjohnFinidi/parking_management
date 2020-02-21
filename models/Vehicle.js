const Sequelize = require('sequelize');
const db = require('../config/db');

const Vehicle = db.define('vehicle', {
    vehicleID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    licenseNo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [0, 51]
        }
    },
    locID: {
        type: Sequelize.INTEGER,
        
    },
    model: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    ownerName: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
   
    color: {
        type: Sequelize.STRING(20),
        allowNull: true,
        validate: {
            len: [0, 21]
        }
    },
    vehicleIn: {
        type: Sequelize.DATE,
        allowNull: true,
       
    },
    vehicleOut: {
        type: Sequelize.DATE,
        allowNull: true
    },
    vehicleStatus: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    parkingCharge: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = Vehicle;