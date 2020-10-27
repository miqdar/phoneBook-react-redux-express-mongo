import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { postChat, searchChat } from '../actions';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: '', message: '', author2: '', message2: '' };
    }

    handleChangeAuthor = (event) => {
        this.setState({ author: event.target.value });
    }

    handleChangeMessage = (event) => {
        this.setState({ message: event.target.value });
    }

    handleSubmit = (event) => {
        this.props.addChat(this.state.author, this.state.message);
        this.setState({ author: '', message: '' })
        event.preventDefault();
    }

    handleChangeAuthorSearch = (event) => {
        this.setState({ author2: event.target.value });
    }

    handleChangeMessageSearch = (event) => {
        this.setState({ message2: event.target.value });
    }

    handleSearch = (event) => {
        this.props.findChat(this.state.author2, this.state.message2);
        this.setState({ author2: '', message2: '' })
        event.preventDefault();
    }

    // resetChat = (event) => {
    //     console.log('reset nih')
    //     // this.props.findChat(this.state.author2, this.state.message2);
    //     this.setState({ author2: '', message2: '' })
    //     event.preventDefault();
    // }

    render() {
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className="career-form mb-60">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 my-3">
                            <div className="input-group position-relative">
                                <input type="text" className="form-control" id="author" placeholder="Insert Name" value={this.state.author} onChange={this.handleChangeAuthor} />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <input type="text" className="form-control" id="message" placeholder="Insert Phone Number" value={this.state.message} onChange={this.handleChangeMessage} />
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <button type="submit" className="btn btn-lg btn-block btn-light btn-primary" id="contact-submit">
                                Submit
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <button className="btn btn-lg btn-block btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Toggle Search
                            </button>
                        </div>
                    </div>
                </form>
                <form onSubmit={this.handleSearch} className="career-form mb-60 collapse" id="collapseExample">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 my-3">
                            <div className="input-group position-relative">
                                <input type="text" className="form-control" id="author" placeholder="Search Name" value={this.state.author2} onChange={this.handleChangeAuthorSearch} />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <input type="text" className="form-control" id="message" placeholder="Search Phone Number" value={this.state.message2} onChange={this.handleChangeMessageSearch} />
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <button type="submit" className="btn btn-lg btn-block btn-light btn-primary" id="contact-submit">
                                Search
                            </button>
                        </div>
                       
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addChat: (author, message) => dispatch(postChat(author, message)),
    findChat: (author, message) => dispatch(searchChat(author, message))
})

export default connect(
    null,
    mapDispatchToProps
)(ChatForm)