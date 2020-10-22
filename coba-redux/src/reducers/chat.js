const chats2 = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_EDIT':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.edit = true;
                }
                return item
            })

        case 'FALSE_EDIT':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.edit = false;
                }
                return item
            })

        case 'CANCEL_EDIT':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.edit = true;
                }
                return item
            })

        case 'LOAD_CHAT_SUCCESS':
            console.log('tes3')
            return action.chats1.map((item) => {
                item.sent = true;
                item.edit = false;
                return item
            })

        case 'UPDATE_CHAT':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.author = action.author;
                    item.message = action.message;
                    item.sent = true;
                    item.edit = false;
                }
                return item
            })

        case 'UPDATE_CHAT_SUCCESS':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = true;
                }
                return item
            })

        case 'UPDATE_CHAT_FAILURE':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item
            })

        case 'POST_CHAT':
            return [
                {
                    id: action.id,
                    author: action.author,
                    message: action.message,
                    sent: true
                },
                ...state
            ]

        case 'POST_CHAT_SUCCESS':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = true;
                }
                return item
            })

        case 'POST_CHAT_FAILURE':
            return state.map((item) => {
                if (item.id === action.id) {
                    item.sent = false;
                }
                return item
            })

        case 'DELETE_CHAT':
            return state.filter((item) => item.id !== action.id)

        case 'DELETE_CHAT_SUCCESS':
            return state

        case 'LOAD_CHAT_FAILURE':
        case 'DELETE_CHAT_FAILURE':
        default:
            return state
    }
}

export default chats2