import {DataTypes, Model} from 'sequelize'
import {sequelize} from '../database.js'

class Review extends Model {
}

Review.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    houseId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    comment: {type: DataTypes.TEXT, allowNull: false}
}, {
    sequelize,
    modelName: 'review',
    timestamps: true
})

export default Review
