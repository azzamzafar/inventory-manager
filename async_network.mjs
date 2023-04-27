
export const axiosInstance = axios.create({
    baseURL: 'https://crudcrud.com/api/601da0984f0748d7b401e834f4fbe758'
})
export async function postItem(body){
    try{
        let response = await axiosInstance.post('/items',body)
        if (response.status<300){
            return response
        }
    }catch(error){
        return error
    }
}
export async function getItems(){
    try{
        let response = await axiosInstance.get('/items')
        if (response.status==200){
            let data = await response.data
            return data;
        }
        else{
            throw(Error)
        }
    }catch(e){
        return e
    }
}
export async function getBody(id){
    try{
        let response = await axiosInstance.get(`/items/${id}`)
        if (response.status==200){
            let data = response.data
            return data;
        }
        else{
            throw(error)
        }
    }catch(e){
        return e
    }
}
export async function putItem(id,body){
    try{
        let response = await axiosInstance.put(`/items/${id}`,body)
        if (response.status<300){
            return response;
        }
        else{
            throw(Error)
        }
    }catch(e){
        return e;
    }
}