import { Router } from 'express'
import { tarefasController } from '../controllers/TarefaController'

const tarefaController = new tarefasController()
export const tarefa : Router = Router()

tarefa.

tarefa.get('/tarefas', tarefaController.index)
tarefa.get('/tarefas/:tarefaId', tarefaController.show)
tarefa.post('/tarefas', tarefaController.create)
tarefa.put('/tarefas/:tarefaId', tarefaController.update)
tarefa.delete('/tarefas/:tarefaId', tarefaController.delete)
