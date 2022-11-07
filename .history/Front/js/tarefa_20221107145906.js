const ENDPOINT = "http://localhost:3000/"

const getTarefas = () => {
    return axios.get(`${ENDPOINT}tarefas`)
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