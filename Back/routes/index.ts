import { Router } from 'express'

import { tipo } from './tipo'
import { tarefa } from './tarefa'

export const router : Router = Router()

router.use(tipo)
router.use(tarefa)
