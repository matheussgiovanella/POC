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
    axios.get(`${ENDPOINT}/tarefas`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.descricao + '</td>';
                trHTML += '<td>' + element.situacao + '</td>';
                trHTML += '<td>' + element.situacao + '</td>';
                trHTML += '<td>' + element.situacao + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCityEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="cityDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
};
loadTable()
getTarefas()

const main = async () =>
{
    console.log(await getTarefas())
}

main()

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