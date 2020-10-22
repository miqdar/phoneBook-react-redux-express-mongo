import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


// start load chat data
const loadChatSuccess = (chats1) => ({
    type: 'LOAD_CHAT_SUCCESS',
    chats1
})

const loadChatFailure = () => ({
    type: 'LOAD_CHAT_FAILURE'
})

export const loadChat = () => {
    return dispatch => {
        return request.get('chats')
            .then(function (response) {
                console.log('tes2')
                dispatch(loadChatSuccess(response.data))
                console.log('tes4')
            })
            .catch(function (error) {
                console.error(error);
                dispatch(loadChatFailure())
            });
    }
}


// start post chat data
const postChatSuccess = (id) => ({
    type: 'POST_CHAT_SUCCESS',
    id
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
    type: 'DELETE_CHAT_SUCCESS',
    id
})

const deleteChatFailure = () => ({
    type: 'DELETE_CHAT_FAILURE'
})


export const deleteChat = (id) => {
    return dispatch => {
        dispatch(deleteChatRedux(id))
        return request.delete(`chats/${id}`)
            .then(function (response) {
                dispatch(deleteChatSuccess(response.data))
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
    return dispatch => {
        dispatch(loadEdit(id))
    }
}

const falseEdit = (id) => ({
    type: 'FALSE_EDIT', id
})

export const falsekanEdit = (id) => {
    return dispatch => {
        dispatch(falseEdit(id))
    }
}


const cancelStateEdit = (id) => ({
    type: 'CANCEL_EDIT', id
})
export const cancelEdit = (id) => {
    return dispatch => {
        dispatch(cancelStateEdit(id))
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
    // let id = Date.now();
    console.log(id, author, message)
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