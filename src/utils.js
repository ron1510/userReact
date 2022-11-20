import axios from 'axios';

const getAll = (url) => { 
    const res = axios.get(url);
    
    return res
}

const getById = (url, id) => axios.get(`${url}/${id}`);

const getByQuery = (url, query, res) => axios.get(`${url}/?${query}=${res}`);

const deleteItem = (items, item) => {
    let tmp = []
    for (let i = 0; i < items.length; i++){
        if (items[i].id !== item.id) {
            tmp.push(items[i])
        }
    }
    return tmp
}

const updateItem = (items, item) => {
    let tmp = []
    for (let i = 0; i < items.length; i++){
        if (items[i].id === item.id) {
            tmp.push(item)
        }
        else {
            tmp.push(items[i])
        }
    }
    return tmp
}

const deleteByUserId = (items, userId)=>{
    let tmp = []
    for (let i = 0; i < items.length; i++){
        if (items[i].userId !== userId) {
            tmp.push(items[i])
        }
    }
    return tmp
}

const completedAllTodos = (todos)=>{
    for (let i = 0; i < todos.length; i++){
        if (todos[i].completed !== true) {
            return false
        }
    }
    return true
}

const getNextId = (allUsers) => {
    const tmp = allUsers.map(user => {
        return user.id
    })
    tmp.sort((a, b) => a - b)
    if (tmp.length === 0) {
        return 1
    }
    else if(tmp.length === 1){
        return (tmp[0] === 1? 2: 1)
    }
    else if (tmp[0] !== 1) {
        return 1
    }
    let i = 0
    for (i = 0; i < tmp.length - 1; i++){
        if (tmp[i] + 1 < tmp[i+1]) {
            console.log(tmp[i] + 1)
            return tmp[i] + 1;
        }
    }
    return tmp[i]+1
}

const checkSubstringInUser = (sub, user) => {
    return user.name.includes(sub) || user.email.includes(sub)
}



export { getAll, getById,getByQuery, checkSubstringInUser,deleteItem,updateItem,deleteByUserId,completedAllTodos,getNextId};