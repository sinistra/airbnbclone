import { Model, DataTypes } from 'sequelize'

import { sequelize } from '../database.js'

class Booking extends Model {}

Booking.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    houseId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false }
}, {
    sequelize,
    modelName: 'booking',
    timestamps: true
})

export default Booking
