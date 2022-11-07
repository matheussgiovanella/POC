import { Sequelize } from 'sequelize'

export const db = new Sequelize('POC','user','user',
{
    dialect: 'postgres',
    host: '177.44.248.58',
    port: 5432,
})

db.sync()
