import React, { Component } from 'react';
import ChatForm from '../containers/ChatForm';
import ChatList from '../containers/ChatList';


export default class ChatBox extends Component {
   
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto mb-4">
                        <div className="section-title text-center ">
                            <h3 className="top-c-sep">Phone Book</h3>
                            <p>Made with React Redux Express Mongo</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="career-search mb-60">
                            <ChatForm />
                            <ChatList />
                            
                        </div>
                            
                    </div>
                </div>
            </div>
        )
    }
}