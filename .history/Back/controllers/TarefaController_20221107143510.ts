import { Request, Response, NextFunction } from 'express'
import { Op, WhereOptions, Includeable } from 'sequelize'
import { Tarefa } from '../models/Tarefa'


import { Log } from '../logs'
import { Tipo } from '../models/Tipo'
const newLog = new Log()

export class tarefasController
{
    index = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const params = req.query
            const limit = Number(params.limit) || 100
            const page = Number(params.page) || 1
            const offset = (page - 1) * limit
            const sort : any = params.sort || 'id'
            const order : any = params.order || 'ASC'
            const where : WhereOptions =
            {
                
            }
            const include : Includeable[] =
            [
                { model: Tipo }
            ]
            
            if (params.data_criacaoEqual)
            {
                where.data_criacao =
                {
                    [Op.eq]: params.data_criacaoEqual // =
                }
            }
            if (params.data_criacaoNotEqual)
            {
                where.data_criacao =
                {
                    [Op.ne]: params.data_criacaoNotEqual // !=
                }
            }
            if (params.data_criacaoGreaterThan)
            {
                where.data_criacao =
                {
                    [Op.gt]: params.data_criacaoGreaterThan // >
                }
            }
            if (params.data_criacaoGreaterOrEqualThan)
            {
                where.data_criacao =
                {
                    [Op.gte]: params.data_criacaoGreaterOrEqualThan // >=
                }
            }
            if (params.data_criacaoLessThan)
            {
                where.data_criacao =
                {
                    [Op.lte]: params.data_criacaoLessThan // <
                }
            }
            if (params.data_criacaoLessOrEqualThan)
            {
                where.data_criacao =
                {
                    [Op.lte]: params.data_criacaoLessOrEqualThan // <=
                }
            }
            if (params.data_criacaoBetween)
            {
                where.data_criacao =
                {
                    [Op.between]: params.data_criacaoBetween // BETWEEN
                }
            }
            if (params.data_criacaoNotBetween)
            {
                where.data_criacao =
                {
                    [Op.notBetween]: params.data_criacaoNotBetween // NOT BETWEEN
                }
            }
            if (params.data_vencimentoEqual)
            {
                where.data_vencimento =
                {
                    [Op.eq]: params.data_vencimentoEqual // =
                }
            }
            if (params.data_vencimentoNotEqual)
            {
                where.data_vencimento =
                {
                    [Op.ne]: params.data_vencimentoNotEqual // !=
                }
            }
            if (params.data_vencimentoGreaterThan)
            {
                where.data_vencimento =
                {
                    [Op.gt]: params.data_vencimentoGreaterThan // >
                }
            }
            if (params.data_vencimentoGreaterOrEqualThan)
            {
                where.data_vencimento =
                {
                    [Op.gte]: params.data_vencimentoGreaterOrEqualThan // >=
                }
            }
            if (params.data_vencimentoLessThan)
            {
                where.data_vencimento =
                {
                    [Op.lte]: params.data_vencimentoLessThan // <
                }
            }
            if (params.data_vencimentoLessOrEqualThan)
            {
                where.data_vencimento =
                {
                    [Op.lte]: params.data_vencimentoLessOrEqualThan // <=
                }
            }
            if (params.data_vencimentoBetween)
            {
                where.data_vencimento =
                {
                    [Op.between]: params.data_vencimentoBetween // BETWEEN
                }
            }
            if (params.data_vencimentoNotBetween)
            {
                where.data_vencimento =
                {
                    [Op.notBetween]: params.data_vencimentoNotBetween // NOT BETWEEN
                }
            }
            if (params.descricaoEqual)
            {
                where.descricao =
                {
                    [Op.eq]: params.descricaoEqual // =
                }
            }
            if (params.descricaoNotEqual)
            {
                where.descricao =
                {
                    [Op.ne]: params.descricaoNotEqual // !=
                }
            }
            if (params.descricaoContains)
            {
                where.descricao =
                {
                    [Op.like]: `%${params.descricaoContains}%` // CONTAINS CASE SENSITIVE
                }
            }
            if (params.descricaoNotContains)
            {
                where.descricao =
                {
                    [Op.notLike]: `%${params.descricaoNotContains}%` // NOT CONTAINS CASE SENSITIVE
                }
            }
            if (params.descricaoIContains)
            {
                where.descricao =
                {
                    [Op.iLike]: `%${params.descricaoIContains}%` // CONTAINS CASE INSENSITIVE
                }
            }
            if (params.descricaoNotIContains)
            {
                where.descricao =
                {
                    [Op.notILike]: `%${params.descricaoNotIContains}%` // NOT CONTAINS CASE INSENSITIVE
                }
            }
            if (params.situacaoEqual)
            {
                where.situacao =
                {
                    [Op.eq]: params.situacaoEqual // =
                }
            }
            if (params.situacaoNotEqual)
            {
                where.situacao =
                {
                    [Op.ne]: params.situacaoNotEqual // !=
                }
            }
            if (params.situacaoContains)
            {
                where.situacao =
                {
                    [Op.like]: `%${params.situacaoContains}%` // CONTAINS CASE SENSITIVE
                }
            }
            if (params.situacaoNotContains)
            {
                where.situacao =
                {
                    [Op.notLike]: `%${params.situacaoNotContains}%` // NOT CONTAINS CASE SENSITIVE
                }
            }
            if (params.situacaoIContains)
            {
                where.situacao =
                {
                    [Op.iLike]: `%${params.situacaoIContains}%` // CONTAINS CASE INSENSITIVE
                }
            }
            if (params.situacaoNotIContains)
            {
                where.situacao =
                {
                    [Op.notILike]: `%${params.situacaoNotIContains}%` // NOT CONTAINS CASE INSENSITIVE
                }
            }
            if (params.prioridadeEqual)
            {
                where.prioridade =
                {
                    [Op.eq]: params.prioridadeEqual // =
                }
            }
            if (params.prioridadeNotEqual)
            {
                where.prioridade =
                {
                    [Op.ne]: params.prioridadeNotEqual // !=
                }
            }
            if (params.prioridadeGreaterThan)
            {
                where.prioridade =
                {
                    [Op.gt]: params.prioridadeGreaterThan // >
                }
            }
            if (params.prioridadeGreaterOrEqualThan)
            {
                where.prioridade =
                {
                    [Op.gte]: params.prioridadeGreaterOrEqualThan // >=
                }
            }
            if (params.prioridadeLessThan)
            {
                where.prioridade =
                {
                    [Op.lte]: params.prioridadeLessThan // <
                }
            }
            if (params.prioridadeLessOrEqualThan)
            {
                where.prioridade =
                {
                    [Op.lte]: params.prioridadeLessOrEqualThan // <=
                }
            }
            if (params.prioridadeBetween)
            {
                where.prioridade =
                {
                    [Op.between]: params.prioridadeBetween // BETWEEN
                }
            }
            if (params.prioridadeNotBetween)
            {
                where.prioridade =
                {
                    [Op.notBetween]: params.prioridadeNotBetween // NOT BETWEEN
                }
            }

            const data = await Tarefa.findAll(
                {
                    include: include,
                    where: where,
                    limit: limit,
                    offset: offset,
                    order: [ [sort, order] ]
                }
            )
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    show = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const include : Includeable[] =
            [
            
            ]

            const id = req.params.tarefaId
            const data = await Tarefa.findByPk(id,
            {
                include: include
            })
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    create = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const newTarefa = await this._validateData(req.body)
            const data = await Tarefa.create(newTarefa)
            await newLog.add('New Tarefa created!')
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    update = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const id = req.params.tarefaId
            const data = await this._validateData(req.body, id)
            await Tarefa.update(data,
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Tarefa updated!')
            res.json(await Tarefa.findByPk(id))
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    delete = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const id = req.params.tarefaId
            await Tarefa.destroy(
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Tarefa deleted!')
            res.json({})
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    _validateData = async (data : any, id? : string) =>
    {
        const requiredAttributes : any =
        [
			'data_criacao',
			'data_vencimento',
			'descricao',
			'situacao',
			'prioridade',
            'tipo_id'
        ]
        for (const attribute of requiredAttributes)
        {
            if (data[attribute] === undefined)
            {
                throw new Error(`The attribute ${attribute} is required.`)
            }
        }
        
        return data
    }
}
