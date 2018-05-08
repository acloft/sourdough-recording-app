import axios from 'axios'

const headers={}
const baseUrl = `http://localhost:8080/api`

export function create(data){
    const config={
        method: "POST",
        data: data, 
        headers
    }

   return axios(baseUrl, config)
   .then(data=>data.data)
}

export function readAll(){
    const config={
        method: 'GET', 
        headers
    }
    
    return axios(baseUrl, config)
    .then(data=>data.data)
}

export function update(data){
    const config ={
        method: 'PUT', 
        headers,
        data
    }
    return axios(baseUrl, config)
   .then(data=>data.data)
}

export function deleteBake(id){
    const config ={
        method: 'DELETE', 
        headers,
    }

    return axios(`${baseUrl}/${id}`, config)
}