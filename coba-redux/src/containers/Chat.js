
import { connect } from 'react-redux'
import { deleteChat, resendChat, truekanEdit, falsekanEdit, cancelEdit, updateChat } from '../actions'
import ChatItem from '../components/ChatItem'


const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: () => dispatch(deleteChat(ownProps.id)),
    truekanEdit: () => dispatch(truekanEdit(ownProps.id)),
    falsekanEdit: () => dispatch(falsekanEdit(ownProps.id)),
    cancelEdit: () => dispatch(cancelEdit(ownProps.id)),
    update: () => dispatch(updateChat(ownProps.id, ownProps.author, ownProps.message)),
    resend: () => dispatch(resendChat(ownProps.id, ownProps.author, ownProps.message))
})

export default connect(
    null,
    mapDispatchToProps
)(ChatItem)