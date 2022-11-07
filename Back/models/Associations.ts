import { Tipo } from './Tipo'
import { Tarefa } from './Tarefa'

export const createAssociations = () =>
{
    
    Tarefa.belongsTo(Tipo, {
        foreignKey: {
            name: 'tipo_id',
            allowNull: false
        },
        targetKey: 'id',
    })
    Tipo.hasMany(Tarefa, {
        foreignKey: {
            name: 'tipo_id',
            allowNull: false
        },
        sourceKey: 'id',
    })
}
