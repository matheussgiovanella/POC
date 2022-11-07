import { Tipo } from './Tipo'
import { Tarefa } from './Tarefa'

export const createAssociations = () =>
{
    
    Tipo.belongsTo(Tarefa, {
        foreignKey: {
            name: 'tarefa_id',
            allowNull: false
        },
        targetKey: 'id',
    })
    Tarefa.hasMany(Tipo, {
        foreignKey: {
            name: 'tarefa_id',
            allowNull: false
        },
        sourceKey: 'id',
    })
}
