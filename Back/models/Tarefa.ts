import { Sequelize, DataTypes, Model } from 'sequelize'
import { db } from "../db"
    
export class Tarefa extends Model
{
    declare id : number
	declare data_criacao : string
	declare data_vencimento : string
	declare descricao : string
	declare situacao : string
	declare prioridade : number
    declare tipo_id : number
}
    
Tarefa.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        data_criacao:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        data_vencimento:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        descricao:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        situacao:
        {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        prioridade:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Tarefa',
        tableName: 'tarefas',
        timestamps: false
    }
)
