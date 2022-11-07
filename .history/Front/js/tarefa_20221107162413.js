const ENDPOINT = "http://localhost:3000/"

const getTarefas = async () => {
    const response = await axios.get(`${ENDPOINT}tarefas`)
    return response.data
}

const taskDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete?`)) {
        return;
    }

    const task = await getTarefas(id);
    const data = task.data;
    axios.delete(`${ENDPOINT}/tarefas/` + id)
        .then((response) => {
            Swal.fire(`Task '${data.name}' deleted`);
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete task: ${error.response.data.error} `);
            loadTable();
        });
};

const getTipos = async () => {
    const response = await axios.get(`${ENDPOINT}tipos`)
    return response.data
}
const loadTable = () => {
    axios.get(`${ENDPOINT}tarefas`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.data_criacao + '</td>';
                trHTML += '<td>' + element.data_vencimento + '</td>';
                trHTML += '<td>' + element.descricao + '</td>';
                trHTML += '<td>' + element.situacao + '</td>';
                trHTML += '<td>' + element.prioridade + '</td>';
                trHTML += '<td>' + element.Tipo.descricao + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showTaskEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="taskDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};
loadTable()

const showTaskCreateBox = async () => {
    const tipos = await getTipos()
    
    let tipoOptions = ``

    for (const tipo of tipos)
    {
        tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
    }

    document.addEventListener('input', (e) =>
    {
        createMask(e, 'data_vencimento', '__/__/____')
    })

    Swal.fire(
        {
            title: `Create new Task`,
            html:
                `<form id="swal-form">` +
                    `<input type="hidden" value="${getDate()}" />`
                    `<div>` +
                        `<label>Data de Vencimento: </label>` +
                        `<input name="data_vencimento" placeholder="DD/MM/AA" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Descrição Tarefa: </label>` +
                        `<input name="descricao" placeholder="Ex: limpar a casa" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Situação: </label>` +
                        `<select name="situacao">` +
                            `<option value="Criada">Criada</option>` +
                            `<option value="Fechada">Fechada</option>` +
                            `<option value="Cancelada">Cancelada</option>` +
                            `<option value="Fazendo">Fazendo</option>` +
                        `</select>` +
                    `</div>` +
                    `<div>` +
                        `<label>Prioridade: </label>` +
                        `<input name="prioridade" type="number" placeholder="Prioridade" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Tipo: </label>` +
                        `<select name="tipo_id">` +
                            `${tipoOptions}` +
                        `</select>` +
                    `</div>` +
                `</form>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () =>
            {
                try
                {
                    const form = document.getElementById('swal-form')
                    const data = await createNew('tarefas', form)
    
                    successPopUp(`Success`, `New Task created!`)
                }
                catch (error)
                {
                    console.log(error.response.data.error)
                    return false
                }
            }
        }
    )
}

const SendEmail = async () => {
    //const await get
    Swal.fire(
        {
            title: `Create new Task`,
            html:
                `<form id="swal-form">` +
                    `<input type="hidden" value="" />`
                    `<div>` +
                        `<label>Data de Vencimento: </label>` +
                        `<input name="data_vencimento" placeholder="DD/MM/AA" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Descrição Tarefa: </label>` +
                        `<input name="descricao" placeholder="Ex: limpar a casa" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Situação: </label>` +
                        `<select name="situacao">` +
                            `<option value="Criada">Criada</option>` +
                            `<option value="Fechada">Fechada</option>` +
                            `<option value="Cancelada">Cancelada</option>` +
                            `<option value="Fazendo">Fazendo</option>` +
                        `</select>` +
                    `</div>` +
                    `<div>` +
                        `<label>Prioridade: </label>` +
                        `<input name="prioridade" type="number" placeholder="Prioridade" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Tipo: </label>` +
                        `<select name="tipo_id">` +
                            `${tipoOptions}` +
                        `</select>` +
                    `</div>` +
                `</form>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () =>
            {
                try
                {
                    const form = document.getElementById('swal-form')
                    const data = await createNew('tarefas', form)
    
                    successPopUp(`Success`, `New Task created!`)
                }
                catch (error)
                {
                    console.log(error.response.data.error)
                    return false
                }
            }
        }
    )
}

const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime;
}

const createMask = (e, name, maskExample) =>
{
    if (e.target.name === name)
    {
        let number = e.target.value.replace(/[^\d]/g, '')
  
        if (!number.length)
        {
            e.target.value = ''
            return
        }
            
        let mask = maskExample
            
        number = number.split('')
            
        let output = ''
        let char, index

        for(index in mask)
        {
            const i = Number(index)

            char = mask[i] === '_' ? number.shift() : mask[i]
            output += char
                
            if (number.length === 0) break
        }
        e.target.value = output
    }
}

const createNew = async (path, form) =>
{
    const attributes = await getFormData(form)
    const [id, newObj] = await getObj(attributes)
    
    const result = await axios.post(`${ENDPOINT}${path}`, newObj)
    
    return result.data
}

const getObj = async (attributes) =>
{
    const Obj = {}
    let id = 0

    for (const attribute of attributes)
    {
        if (attribute[0] !== 'id')
        {
            if (attribute[0] === 'data' || attribute[0] === 'data_vencimento')
            {
                Obj[attribute[0]] = attribute[1].toString().split('/').reverse().join('-')
            }
            else
            {
                Obj[attribute[0]] = attribute[1]
            }
        }
        else
        {
            id = Number(attribute[1])
        }
    }

    return [id, Obj]
}

const getFormData = async (form) =>
{
    const formData = new FormData(form)

    let pairs = []
    
    for (const pair of formData.entries())
    {
        pairs.push(pair)
    }
    
    return pairs
}