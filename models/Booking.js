const Sequelize = require('sequelize');
const db = require('../config/db');

const Booking = db.define('booking', {
    bookingID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    locID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
    },
    booking: {
        type: Sequelize.DATE,
      
    },
    licenseNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    personName: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
 
}, {
    timestamps: false
})

module.exports = Booking;