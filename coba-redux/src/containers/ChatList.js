import React, { Component } from 'react';
import ChatItem from './Chat';
import { connect } from 'react-redux';
import { loadChat } from '../actions'


const buatState = (state) => ({
    data1: state.chats2
})

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(loadChat())
})


class ChatList extends Component {

    componentDidMount() {
        this.props.load();
        console.log('tes1')
    }

    render() {
        const nodes = this.props.data1.map(item => {
            return (
                <ChatItem
                    key={item.id}
                    id={item.id}
                    author={item.author}
                    message={item.message}
                    sent={item.sent}
                    edit={item.edit} />)
        })
        
        return (
            <div className="filter-result">
                <p className="mb-30 ff-montserrat">Total Contacts : 89</p>
                {nodes}
            </div>

        )
    }
}


export default connect(
    buatState,
    mapDispatchToProps
)(ChatList)