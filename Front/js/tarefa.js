const ENDPOINT = "http://localhost:3000/"

const getTarefas = async () => {
    const response = await axios.get(`${ENDPOINT}tarefas?limit=1000`)
    return response.data
}

const getTarefa = async (id) => {
    const response = await axios.get(`${ENDPOINT}tarefas/${id}`)
    return response.data
}

const taskDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete?`)) {
        return;
    }

    const task = await getTarefa(id);
    
    axios.delete(`${ENDPOINT}tarefas/` + id)
        .then((response) => {
            Swal.fire(`Task '${task.descricao}' deleted`)
            loadTable();
        }, (error) => {
            Swal.fire(`Error to delete task: ${error.response.data.error} `);
            loadTable();
            return;
        });

    Swal.fire(`Task '${task.descricao}' deleted`)
    loadTable();
};

const getTipos = async () => {
    const response = await axios.get(`${ENDPOINT}tipos`)
    return response.data
}
const loadTable = (sort, type) => {
    if (type)
    {
        axios.get(`${ENDPOINT}tarefas?limit=1000&type=${type}&sort=${sort}`)
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
    }
    else
    {
        axios.get(`${ENDPOINT}tarefas?limit=1000&sort=${sort}`)
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
    }
};
loadTable('id')

const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime;
}

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

    const dateTime = await getDate()

    Swal.fire(
        {
            title: `Create new Task`,
            html:
                `<form id="swal-form">` +
                    `<input name="data_criacao" type="hidden" value="${dateTime}" />` +
                    `<div>` +
                        `<label>Data de Vencimento: </label>` +
                        `<input name="data_vencimento" placeholder="DD/MM/AA" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Descri????o Tarefa: </label>` +
                        `<input name="descricao" placeholder="Ex: limpar a casa" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Situa????o: </label>` +
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

const showTaskEditBox = async (id) => {
    const tipos = await getTipos()
    const task = await getTarefa(id)

    console.log(task)
    
    let tipoOptions = ``

    for (const tipo of tipos)
    {
        if (task.Tipo.id === tipo.id)
        {
            tipoOptions += `<option selected value="${tipo.id}">${tipo.descricao}</option>`
        }
        else
        {
            tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
        }
    }

    // document.addEventListener('input', (e) =>
    // {
    //     createMask(e, 'data_vencimento', '__/__/____')
    // })

    const getStatus = () =>
    {
        if (task.situacao === 'Criada')
        {
            return `<option selected value="Criada">Criada</option>` +
                `<option value="Fechada">Fechada</option>` +
                `<option value="Cancelada">Cancelada</option>` +
                `<option value="Fazendo">Fazendo</option>`
        }
        else if (task.situacao === 'Fechada')
        {
            return `<option value="Criada">Criada</option>` +
                `<option selected value="Fechada">Fechada</option>` +
                `<option value="Cancelada">Cancelada</option>` +
                `<option value="Fazendo">Fazendo</option>`
        }
        else if (task.situacao === 'Cancelada')
        {
            return `<option value="Criada">Criada</option>` +
                `<option value="Fechada">Fechada</option>` +
                `<option selected value="Cancelada">Cancelada</option>` +
                `<option value="Fazendo">Fazendo</option>`
        }
        else if (task.situacao === 'Fazendo')
        {
            return `<option value="Criada">Criada</option>` +
                `<option value="Fechada">Fechada</option>` +
                `<option value="Cancelada">Cancelada</option>` +
                `<option selected value="Fazendo">Fazendo</option>`
        }
    }

    Swal.fire(
        {
            title: `Edit Task`,
            html:
                `<form id="swal-form">` +
                    `<input name="id" type="hidden" value="${task.id}" />` +
                    `<input name="data_criacao" type="hidden" value="${task.data_criacao}" />` +
                    `<div>` +
                        `<label>Data de Vencimento: </label>` +
                        `<input name="data_vencimento" placeholder="DD/MM/AA" value="${task.data_vencimento}" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Descri????o Tarefa: </label>` +
                        `<input name="descricao" placeholder="Ex: limpar a casa" value="${task.descricao}" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Situa????o: </label>` +
                        `<select name="situacao">` +
                            `${getStatus()}` + 
                        `</select>` +
                    `</div>` +
                    `<div>` +
                        `<label>Prioridade: </label>` +
                        `<input name="prioridade" type="number" placeholder="Prioridade" value="${task.prioridade}" />` +
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
                    const data = await edit('tarefas', form)
    
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
const showFilterTypeBox = async () => {
    const tipos = await getTipos()
    let tipoOptions = ``

    for (const tipo of tipos)
    {
        {
            tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
        }
    }
    Swal.fire(
        {
            title: 'Filter task',
            html: 
                `<form id="swal-form">`+
                    `<div>`+
                        `<label>Filtrar por id:</label>`+
                        `<br/>`+
                        `<select id="id" name="id">`+
                            `<option value="id">ID</option>`+
                            `<option value="prioridade">Prioridade</option>`+
                        `</select>`+
                    `</div>`+
                    `<div>`+
                        `<label>Filtrar por tipo:</label>`+
                        `<br/>`+
                        `<select id="filter" name="tipo_id">`+
                            `<option value="all">All</option>`+
                            `${tipoOptions}`+
                        `</select>`+
                    `</div>`+
                    
                `</form>`
        }
    ).then((result) =>
    {
        if (result.isConfirmed)
        {
            const id = document.getElementById('id').value
            const tipo = document.getElementById('filter').value
            if (tipo === 'all')
            {
                loadTable(id)
            }
            else
            {
                loadTable(id, tipo)
            }
        }
    })
    
}



const successPopUp = (title, text) =>
{
    Swal.fire(
        {
            icon: 'success',
            title: title,
            text: text,
            timer: 3000,
            timerProgressBar: true,
            customClass: 'popUp'
        }
    )
    .then(() =>
    {
        window.location.reload()
    })
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

const edit = async (path, form) =>
{
    const attributes = await getFormData(form)
    const [id, newObj] = await getObj(attributes)
    
    const result = await axios.put(`${ENDPOINT}${path}/${id}`, newObj)
    
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

// const sendEmail = async (email, id) => {
//     const task = await getTarefa(id);

//     var nodemailer = require('nodemailer');
//     let email_user = '';
//     let email_pass = '';
//     let email_to = email;
//     let email_subject = 'Tarefa';
//     let email_content = `${task.descricao}`;

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: email_user,
//         pass: email_pass
//       }
//     });

//     var mailOptions = {
//       from: email_user,
//       to: email_to,
//       subject: email_subject,
//       text: email_content,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log('Error: ' + error);
//       }
//       else {
//         console.log('Email sent: ' + info.response);
//       };
//     });
//   }