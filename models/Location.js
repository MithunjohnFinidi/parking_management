const Sequelize = require('sequelize');
const db = require('../config/db');

const Location = db.define('location', {
    locID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    locName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            len: [0, 51]
        }
    },
    locDesc: {
        type: Sequelize.STRING(100),
        validate: {
            len: [0, 101]
        }
    },
    numOfSlots: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numOfDisabledSlots: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numOfReserved: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    speedLimit: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            len: [0, 21]
        }
    },
    locStatus: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            len: [0, 31]
        }
    },
    availableSlots: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    parkingCharge: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Location;