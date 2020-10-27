import React, { Component } from 'react';
import ChatItem from './Chat';
import { connect } from 'react-redux';
import { loadChat } from '../actions'


const buatState = (state) => ({
    data1: state.chats2.phone,
    pager: state.chats2.page
})

const mapDispatchToProps = (dispatch) => ({
    load: (page) => dispatch(loadChat(page))
})


class ChatList extends Component {

    componentDidMount() {
        this.props.load();
    }

    handlePage = (event) => {
        this.props.load(event.target.value);
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
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-reset justify-content-center">
                        {
                            [...Array(this.props.pager.pages)].map((a, i) => {
                                return <li key={i + 1} className="page-item"><button className="page-link" value={i + 1} onClick={this.handlePage}>{i + 1}</button></li>
                            })
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}


export default connect(
    buatState,
    mapDispatchToProps
)(ChatList)