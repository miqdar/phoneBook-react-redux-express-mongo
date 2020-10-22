import React, { Component } from 'react';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

        this.addChat = this.addChat.bind(this)
        this.resendChat = this.resendChat.bind(this)
    }

    componentDidMount() {
        request.get('chats')
            .then(function (response) {
                const chats = response.data.map((item) => {
                    item.sent = true;
                    item.edit = false;
                    return item;
                })
                this.setState({ data: chats })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    addChat(author, message) {
        const id = Date.now()
        this.setState((state, props) => ({
            data: [...state.data, { id, author, message, sent: true, edit: false }]
        }));

        request.post('chats', { id, author, message })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                this.setState((state, props) => ({
                    data: state.data.map(item => {
                        if (item.id === id) {
                            item.sent = false;
                        }
                        return item;
                    })
                }))
            }.bind(this));
    }

    resendChat(id, author, message) {
        request.post('chats', { id, author, message })
            .then(function (response) {
                console.log(response);
                this.setState((state, props) => ({
                    data: state.data.map(item => {
                        if (item.id === id) {
                            item.sent = true;
                        }
                        return item;
                    })
                }))
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    removeChat = (id) => {
        request.delete(`chats/${id}`)
            .then(function (response) {
                this.setState((state, props) => ({
                    data: state.data.filter(item => id !== item.id)
                }))
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    }

    handleEdit = (id, author, message) => {
        this.setState((state, props) => ({
            data: state.data.map(item => {
                if (item.id === id) {
                    item.edit = true;
                }
                return item;
            })
        }))
    }

    cancelEdit = (id) => {
        this.setState((state, props) => ({
            data: state.data.map(item => {
                if (item.id === id) {
                    item.edit = false;
                }
                return item;
            })
        }))
    }

    postUpdate = (id, author, message) => {
        request.put(`chats/${id}`, { author, message })
            .then((res) => {
                console.log(res)
                this.componentDidMount()
            }).catch(function (err) {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="career-search mb-60">
                            <ChatForm addChat={this.addChat} />
                            <ChatList chats={this.state.data} update={this.state.dataEdit}
                                resend={this.resendChat}
                                remove={this.removeChat}
                                handleEdit={this.handleEdit}
                                cancelEdit={this.cancelEdit}
                                postUpdate={this.postUpdate} />
                        </div>
                        <nav aria-label="Page navigation">
                            <ul className="pagination pagination-reset justify-content-center">
                                <li className="page-item disabled">
                                    <a className="page-link" href="/" tabIndex="-1" aria-disabled="true">
                                        <i className="zmdi zmdi-long-arrow-left"></i>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="/">1</a></li>
                                <li className="page-item d-none d-md-inline-block"><a className="page-link" href="/">2</a></li>
                                <li className="page-item d-none d-md-inline-block"><a className="page-link" href="/">3</a></li>
                                <li className="page-item"><a className="page-link" href="/">...</a></li>
                                <li className="page-item"><a className="page-link" href="/">8</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="/">
                                        <i className="zmdi zmdi-long-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}