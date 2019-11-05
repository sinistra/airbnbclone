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
    startDate: { type: DataTypes.DATEONLY, allowNull: false },
    endDate: { type: DataTypes.DATEONLY, allowNull: false },
    sessionId: { type: DataTypes.STRING },
    paid: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
}, {
    sequelize,
    modelName: 'booking',
    timestamps: true
})

export default Booking
