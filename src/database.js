import {Sequelize} from "sequelize";

export const user = 'postgres'
export const password = 'mysecretpassword'
export const host = 'localhost'
export const database = 'airbnbclone'

export const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'postgres',
    logging: false
})
