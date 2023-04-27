import { postItem, getItems, getBody, putItem} from "./async_network.mjs";
const addForm = document.getElementById('addInventory')
const itemList = document.getElementById('itemList')
// const getItemList = document.getElementById('getItemList')
// EventListeners
itemList.addEventListener('click',buyOne);
itemList.addEventListener('click',buyTwo);
itemList.addEventListener('click',buyThree)
document.addEventListener('DOMContentLoaded',display);
addForm.addEventListener('submit',addItem);
// functions
async function display(){
    let response = await getItems()
    if (!response.message) {
        displayItems(response)
    }
    else{
        alert(response.name,response.message,response.code)
    }
}
async function addItem(e){
    e.preventDefault()
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    if (!name|| !description || !price || !quantity){
        let msg = document.querySelector('.msg')
        msg.classList.add('error');
        msg.style="color:red;"
        msg.innerText='Please enter all fields';
        setTimeout(()=>msg.remove(),3000)
    }
    else{
        let response  = await postItem({
            name:`${name}`,
            description:`${description}`,
            price:Number(`${price}`),
            quantity:Number(`${quantity}`)
        })
        if (response && response.status<300) {
            alert("Item Added")
            addForm.reset()
            location.reload()
        }
        else alert(response)
    }
}

function displayItems(data){
    if (itemList.childElementCount>0){
        itemList.replaceChildren();
    }
    for(let item of data){
        if (item.quantity<1) continue;
        let name = item.name
        let id = item._id
        let description = item.description
        let price = item.price
        let quantity = item.quantity
        let newlistItem = document.createElement('li')
        newlistItem.className="list-group-item";
        let listItemText = createListItemText(id,name,description,price,quantity)
        newlistItem.innerHTML=listItemText
        newlistItem.appendChild(createbuyOneButton())
        newlistItem.appendChild(createbuyTwoButton())
        newlistItem.appendChild(createbuyThreeButton())
        itemList.appendChild(newlistItem)
    }
}
function createListItemText(id,name,description,price,quantity){
    let p="<p>"
    p+=`<strong>id:</strong>`
    p+=`${id} <br>`
    p+=`<strong>Name:</strong>`
    p+=`${name} ` 
    p+=`<strong>Description:</strong>`
    p+=`${description} `
    p+=`<strong>Price:</strong>`
    p+=`${price} ` 
    p+=`<strong>Quantity:</strong>`
    p+=`${quantity}`
    p+='</p>'
    return p
}

function createbuyOneButton(){
    const btn = document.createElement('button')
    btn.className = 'btn btn-primary buyOne'
    btn.textContent='Buy One'
    return btn;
}

function createbuyTwoButton(){
    const btn = document.createElement('button')
    btn.className = 'btn btn-light buyTwo'
    btn.textContent='Buy Two'
    return btn;
}

function createbuyThreeButton(){
    const btn = document.createElement('button')
    btn.className = 'btn btn-dark buyThree'
    btn.textContent='Buy Three'
    return btn;
}
async function buyOne(e){
    if (e.target.classList.contains('buyOne')){
        const id = parseId(e.target.parentElement)
        let body = await getBody(id);
        if (!body.message){
            if (body.quantity<1)alert("Not able to process, Low on reserves!")
            else{
                body.quantity = body.quantity-1;
                delete body._id;
                let response = await putItem(id,body)
                if (!response.message){
                    alert("Inventory Updated")
                    location.reload()
                }
                else{
                    alert(response)
                }
            }
        }
        else{
            alert(body)
        }
    }
} 

async function buyTwo(e){
    if (e.target.classList.contains('buyTwo')){
        const id = parseId(e.target.parentElement)
        let body = await getBody(id);
        if (!body.message){
            if (body.quantity<2)alert("Not able to process, Low on reserves!")
            else{
                body.quantity = body.quantity-2;
                delete body._id;
                let response = await putItem(id,body)
                if (!response.message){
                    alert("Inventory Updated")
                    location.reload()
                }
                else{
                    alert(response)
                }
            }
        }
        else{
            alert(body)
        }
    }
}
async function buyThree(e){
    if (e.target.classList.contains('buyThree')){
        const id = parseId(e.target.parentElement)
        let body = await getBody(id);
        if (!body.message){
            if (body.quantity<3)alert("Not able to process, Low on reserves!")
            else{
                body.quantity = body.quantity-3;
                delete body._id;
                let response = await putItem(id,body)
                if (!response.message){
                    alert("Inventory Updated")
                    location.reload()
                }
                else{
                    alert(response)
                }
            }
        }
        else{
            alert(body)
        }
    }
}
function parseId(listelem){
    const text = listelem.textContent.split(' ');
    for (const sub of text){
        const subsplit = sub.split(":")
        if (subsplit.length>1&&subsplit[0]=='id')return subsplit[1]
    }
}
window.onload = ()=>{
    addForm.reset()
}