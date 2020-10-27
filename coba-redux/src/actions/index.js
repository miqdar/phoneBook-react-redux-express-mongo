import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


// start load chat data
const loadChatSuccess = (chats1, isiPage) => ({
    type: 'LOAD_CHAT_SUCCESS',
    chats1, isiPage
})

const loadChatFailure = () => ({
    type: 'LOAD_CHAT_FAILURE'
})

export const loadChat = (page) => {
    return dispatch => {
        if (!page) { page = '1' }
        return request.get(`chats/?page=${page}`)
            .then(function (response) {
                let isiPage = response.data[response.data.length-1]
                response.data.pop()
                dispatch(loadChatSuccess(response.data, isiPage))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadChatFailure())
            });
    }
}


// start post chat data
const postChatSuccess = (id) => ({
    type: 'POST_CHAT_SUCCESS', id
})

const postChatFailure = (id) => ({
    type: 'POST_CHAT_FAILURE', id
})

const postChatRedux = (id, author, message) => ({
    type: 'POST_CHAT', id, author, message
})

export const postChat = (author, message) => {
    let id = Date.now();
    return dispatch => {
        dispatch(postChatRedux(id, author, message))
        return request.post('chats', { id, author, message })
            .then(function (response) {
                dispatch(postChatSuccess(id))
                dispatch(loadChat(1))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(postChatFailure(id))
            });
    }
}

export const resendChat = (id, author, message) => {
    return dispatch => {
        return request.post('chats', { id, author, message })
            .then(function (response) {
                dispatch(postChatSuccess(id))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(postChatFailure(id))
            });
    }
}


// start delete chat data
const deleteChatRedux = (id) => ({
    type: 'DELETE_CHAT', id
})

const deleteChatSuccess = (id) => ({
    type: 'DELETE_CHAT_SUCCESS', id
})

const deleteChatFailure = () => ({
    type: 'DELETE_CHAT_FAILURE'
})


export const deleteChat = (id) => {
    return dispatch => {
        dispatch(deleteChatRedux(id))
        return request.delete(`chats/${id}`)
            .then(function (response) {
                dispatch(deleteChatSuccess(response.data.id))
                dispatch(loadChat(1))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deleteChatFailure())
            });
    }
}
// end delete chat data


// start edit chat
const loadEdit = (id) => ({
    type: 'LOAD_EDIT', id
})

export const truekanEdit = (id) => {
    console.log('truekan')
    return dispatch => {
        dispatch(loadEdit(id))
    }
}

const falseEdit = (id) => ({
    type: 'FALSE_EDIT', id
})

export const cancelEdit = (id) => {
    return dispatch => {
        dispatch(falseEdit(id))
    }
}


// start update chat
const updateChatSuccess = (id) => ({
    type: 'UPDATE_CHAT_SUCCESS',
    id
})

const updateChatFailure = (id) => ({
    type: 'UPDATE_CHAT_FAILURE', id
})

const updateChatRedux = (id, author, message) => ({
    type: 'UPDATE_CHAT', id, author, message
})

export const updateChat = (id, author, message) => {
    return dispatch => {       
        dispatch(updateChatRedux(id, author, message))
        return request.put(`chats/${id}`, { author, message })
            .then(function (response) {
                dispatch(updateChatSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(updateChatFailure(id))
            });
    }
}


// start search chat
export const searchChat = (author, message) => {
    return dispatch => {
        if (message === '') { message = '9x9x' }
        if (author === '') { author = '9x9x' }
        return request.get(`chats/${author}/${message}`)
            .then(function (response) {
                let isiPage = response.data[response.data.length-1]
                response.data.pop()
                dispatch(loadChatSuccess(response.data, isiPage))
                
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadChatFailure())
            });
    }
}

