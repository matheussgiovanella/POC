const ENDPOINT = "http://localhost:3000/"

const getTarefas = async () => {
    const response = await axios.get(`${ENDPOINT}tarefas`)
    return response.data
}

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
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};
loadTable()

const showTaskCreateBox = async () => {
    const tipos = await getTipos()
    console.log(tipos)

    let tipoOptions = ``

    for (const tipo of tipos)
    {
        tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
    }
    Swal.fire(
        {
            title: `Create new Task`,
            html:
                `<form id="swal-form">` +
                    `<div>` +
                        `<label></label>` +
                        `<input name="data_vencimento" placeholder="Data de Vencimento" />` +
                    `</div>` +
                    `<div>` +
                    `<input name="descricao" placeholder="Descrição Tarefa" />` +
                    `<select name="situacao">` +
                        `<option value="Criada">Criada</option>` +
                        `<option value="Fechada">Fechada</option>` +
                        `<option value="Cancelada">Cancelada</option>` +
                        `<option value="Fazendo">Fazendo</option>` +
                    `</select>` +
                    `<input name="prioridade" placeholder="Prioridade" />` +
                    `<select name="tipo_id">` +
                        `${tipoOptions}` +
                    `</select>` +
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
                    toastError(error.response.data.error)
                    return false
                }
            }
        }
    )
}

const createNew = async (path, form) =>
{
    const attributes = await getFormData(form)
    const [id, newObj] = await getObj(attributes)
    
    const result = await axios.post(`${ENDPOINT}${path}`, newObj)
    
    return result.data
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