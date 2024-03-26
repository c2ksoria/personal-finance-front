//Get data from db and correct date for compatibilities with javascript
const api_url= import.meta.env.VITE_BACK_HOST
const api_port= import.meta.env.VITE_BACKEND_PORT
const enviroment = import.meta.env.VITE_ENVIROMENT
var begin_url = ''

if(enviroment==='production'){
    begin_url=`https://${api_url}`
}
else if(enviroment==='development'){
    begin_url=`http://${api_url}:${api_port}`
}
console.log(begin_url)
const Query = () => {
    const url = `${begin_url}/v1/movements/`
    const method = 'GET'
    const instruction = ""
    const response = fetchAction({url, method, instruction})
        .then(resp=>{
            if(resp.success){
                for (let index = 0; index < resp.data.length; index++) {
                    const firstSplit = resp.data[index].Date.split(/[- :]/)
                    let day =firstSplit[2].split('T')
                    let newDate = firstSplit[0]+"-"+firstSplit[1]+"-"+day[0]
                    resp.data[index].Date=newDate
                }
            }
            return resp        
        })
return response
}

//Delete individual item from db
const deleteMovement = (id) => {
    const url = `${begin_url}/v1/movements/delete`
    const method = 'DELETE'
    const instruction = { id: `${id}` }
    const response = fetchAction({url, method, instruction})
return response
}

//Add a new movement request
const addMovement = async (data) => {
    const url = `${begin_url}/v1/movements/add`
    const method = 'POST'
    const instruction = { category: data.category, details: data.details, type: data.type, date: data.date, quantity: data.qty }
    const response = fetchAction({url, method, instruction})
return response
}

//Update movement with correction of date values for compatibility with db
const updateMovement = (data) => {
    const spliteo = data.date.split('-')
    const newDate = spliteo[0]+"-"+spliteo[1]+"-"+spliteo[2]
    const url = `${begin_url}/v1/movements/update/${data.id}`
    const instruction = { category: data.category, details: data.details, type: data.type, date: newDate, quantity: data.qty }
    const method = 'PUT'
    const response = fetchAction({url, method, instruction})
return response
}

//We can get the main catergories and types of movement, it value are only user in forms for new values or update some movement
const getConfig = () => {
    const url = `${begin_url}/v1/getconfig`
    const method = 'GET'
    const instruction = ""
    let response =  fetchAction({url, method, instruction})
return response
}

//Get random values with de number of diferents values, backend can create new values
const getRandom = (qty) => {
    const url = `${begin_url}/v1/movements/getrandom`
    const method = 'POST'
    const instruction = { qty : qty}
    let response =  fetchAction({url, method, instruction})
return response
}

//General function who make all request tho backend
const fetchAction = async ({url, method, instruction})=>{
    const requestOptions = {
        method: method,
        headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, openai-conversation-id, openai-ephemeral-user-id",
        "Cache-Control": "no-store, max-age=0"
        }
    }
    if (instruction!==""){
        requestOptions["body"]= JSON.stringify(instruction)
    }
    const response =  await fetch(url, requestOptions)
        .then(response => {
            if(response.status===200){
               return response.json()
            }
            else{
               let resp = {"success": false, "message": `Hubo un error con código ${response.status}: ${response.statusText}`}
               return resp
            }
        })
        .then(responseData => {
    return responseData
    })
return response
}
export { Query, addMovement, updateMovement, deleteMovement, getRandom, getConfig }