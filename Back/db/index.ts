import { Sequelize } from 'sequelize'

export const db = new Sequelize('POC','postgres','m02s12g03',
{
    dialect: 'postgres',
    host: '177.44.248.58',
    port: 5432,
})

db.sync()
