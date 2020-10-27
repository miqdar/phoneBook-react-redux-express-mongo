
import { connect } from 'react-redux'
import { deleteChat, resendChat, truekanEdit, cancelEdit, updateChat } from '../actions'
import ChatItem from '../components/ChatItem'


const mapDispatchToProps = (dispatch, ownProps) => ({
    remove: () => dispatch(deleteChat(ownProps.id)),
    truekanEdit: () => dispatch(truekanEdit(ownProps.id)),
    cancelEdit: () => dispatch(cancelEdit(ownProps.id)),
    update: () => dispatch(updateChat(ownProps.id, ownProps.author, ownProps.message)),
    resend: () => dispatch(resendChat(ownProps.id, ownProps.author, ownProps.message))
})

export default connect(
    null,
    mapDispatchToProps
)(ChatItem)