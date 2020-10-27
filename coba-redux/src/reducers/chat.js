let globalState = {
    phone: [],
    page: 1,
    pages: 1
}

const chats2 = (state = globalState, action) => {
    switch (action.type) {
        case 'LOAD_EDIT':
            return {
                phone: state.phone.map((item) => {
                    if (item.id === action.id) {
                        item.edit = true;
                    }
                    return item
                }),
                page: { ...state.page }
            }

        case 'FALSE_EDIT':
            return {
                phone: state.phone.map((item) => {
                    if (item.id === action.id) {
                        item.edit = false;
                    }
                    return item
                }),
                page: { ...state.page }
            }


        case 'LOAD_CHAT_SUCCESS':
            return {
                phone: action.chats1.map((item) => {
                    item.sent = true;
                    item.edit = false;
                    return item
                }),
                page: action.isiPage
            }


        case 'UPDATE_CHAT':
            return {
                ...state, phone: state.phone.map((item) => {
                    if (item.id === action.id) {
                        item.author = action.author;
                        item.message = action.message;
                        item.sent = true;
                        item.edit = false;
                    }
                    return item
                })
            }

        case 'UPDATE_CHAT_SUCCESS':
            return {
                ...state, phone: state.phone.map((item) => {
                    if (item.id === action.id) {
                        item.sent = true;
                    }
                    return item
                })
            }

        case 'UPDATE_CHAT_FAILURE':
            return {
                ...state, phone: state.phone.map((item) => {
                    if (item.id === action.id) {
                        item.sent = false;
                    }
                    return item
                })
            }

        case 'POST_CHAT':
            return {
                phone: [{
                    id: action.id,
                    author: action.author,
                    message: action.message,
                    sent: true
                },
                ...state.phone],
                ...state.page
            }

        case 'POST_CHAT_SUCCESS':
            return state

        case 'POST_CHAT_FAILURE':
            return state.phone.map((item) => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item
            })

        case 'DELETE_CHAT':
            return { ...state, phone: state.phone.filter((item) => item.id !== action.id) }

        case 'DELETE_CHAT_SUCCESS':
            return state

        case 'LOAD_CHAT_FAILURE':
        case 'DELETE_CHAT_FAILURE':
        default:
            return state
    }
}

export default chats2