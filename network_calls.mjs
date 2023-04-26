
export const axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/6a57fcad7c4a42358e84ace8d7a42c6c'
})

export function postItem(body){
    return new Promise((resolve,reject)=>{
        axiosInstance.post('/items',body)
        .then(response=>{
            if(response.status<300){
                resolve()
            }
        })
        .catch(err=>reject(err))
    }) 
}
export function getItems(){
    return new Promise((resolve,reject)=>{
        axiosInstance.get('/items')
        .then(response=>response.data)
        .then((data)=>{
            resolve(data)
        })
        .catch(err=>reject(err))
    })
}
export function putItem(id,body){
    return new Promise((resolve,reject)=>{
        axiosInstance.put(`/items/${id}`,body)
        .then((response)=>{
            if(response.status<300) resolve()
        })
        .catch(err=>reject(err))
    })
}
export function getBody(id){
    return new Promise((resolve,reject)=>{
        axiosInstance.get(`/items/${id}`)
        .then(response=>{
            if(response.status==200){
                return response.data
            }
            else reject(err)
        })
        .then((data)=>resolve(data))
    })
}