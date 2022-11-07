import { Router } from 'express'
import { tarefasController } from '../controllers/TarefaController'

const tarefaController = new tarefasController()
export const tarefa : Router = Router()

tarefa.post('/tarefas', tarefaController.generatePDF)

tarefa.get('/tarefas', tarefaController.index)
tarefa.get('/tarefas/:tarefaId', tarefaController.show)
tarefa.post('/tarefas', tarefaController.create)
tarefa.put('/tarefas/:tarefaId', tarefaController.update)
tarefa.delete('/tarefas/:tarefaId', tarefaController.delete)
