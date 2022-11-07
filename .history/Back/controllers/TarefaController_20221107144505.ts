import { Request, Response, NextFunction } from 'express'
import { Op, WhereOptions, Includeable } from 'sequelize'
import { Tarefa } from '../models/Tarefa'
import pdf, { CreateOptions } from 'html-pdf'
import fs from "fs"
import nodemailer from "nodemailer"


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
    sendEmail = async (email : string) => {
        const email_user = `matheus.giovanella1@universo.univates.br`
        const email_pass = `M02s12g03`

        let email_html = await fs.promises.readFile('./controllers/email.html','utf-8')
        email_html = email_html.replace('$email', email)

        const email_to = email
        const email_subject = `Obrigado por se cadastrar em nosso sistema!`

        const transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth:
                {
                    user: email_user,
                    pass: email_pass
                }
            }
        )

        var mailOptions =
        {
            from: email_user,
            to: email_to,
            subject: email_subject,
            html: email_html
        }

        transporter.sendMail(mailOptions, (error, info) =>
        {
            if (error)
            {
                console.log(`Erro ao enviar email: ${error}`)
            }
            else
            {
                console.log(`Email enviado: ${info.response}`)
            }
        });
    }
    generatePDF = async (req : Request, res : Response, next : NextFunction) =>
    {
        const clientes = await Cliente.findAll(
            {
                order: [ ['id', 'ASC'] ]
            }
        )

        let html = ``

        html += `<h1 style="text-align: center;">Relatório de Clientes</h1>`
        html += `<table border="1" style="width: 100%;">`
        html += `<thead>`
        html += `<tr>`
        html += `<th>#</th>`
        html += `<th>Nome</th>`
        html += `<th>Telefone</th>`
        html += `<th>Email</th>`
        html += `<th>Senha</th>`
        html += `<th>CPF</th>`
        html += `<th>Rua</th>`
        html += `<th>Número</th>`
        html += `<th>CEP</th>`
        html += `<th>Bairro</th>`
        html += `<th>Complemento</th>`
        html += `<th>ID Cidade</th>`
        html += `<th>ID Permissão</th>`
        html += `</tr>`
        html += `</thead>`

        html += `<tbody>`

        for (const cliente of clientes)
        {
            html += `<tr>`

            const values = cliente
            
            html += `<td>${values.id}</td>`
            html += `<td>${values.nome}</td>`
            html += `<td>${values.telefone}</td>`
            html += `<td>${values.email}</td>`
            html += `<td>${values.senha}</td>`
            html += `<td>${values.cpf}</td>`
            html += `<td>${values.rua}</td>`
            html += `<td>${values.numero}</td>`
            html += `<td>${values.cep}</td>`
            html += `<td>${values.bairro}</td>`
            html += `<td>${values.complemento}</td>`
            html += `<td>${values.cidade_id}</td>`
            html += `<td>${values.permissao_id}</td>`

            html += `</tr>`
        }

        html += `</tbody>`
        html += `</table>`

        const options : CreateOptions =
        {
            type: 'pdf',
            format: 'A4',
            orientation: 'landscape'
        }

        pdf.create(html, options).toBuffer((err, buffer) =>
        {
            if (err)
            {
                return res.status(500).json(err)
            }

            res.end(buffer)
        })
    }
}
