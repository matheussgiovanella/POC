const ENDPOINT = "http://localhost:3000/"

const getTarefas = () => {
    const response = axios.get(`${ENDPOINT}tarefas`)
    return response.data
}

const loadTarefas = () =>{
    axios
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