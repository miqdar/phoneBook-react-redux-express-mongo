import React from 'react';
import { connect } from 'react-redux';
import { postChat } from '../actions';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { author: '', message: '' };
    }

    handleChangeAuthor = (event) => {
        this.setState({ author: event.target.value });
    }

    handleChangeMessage = (event) => {
        this.setState({ message: event.target.value });
    }

    handleSubmit = (event) => {
        console.log('bb')
        this.props.addChat(this.state.author, this.state.message);
        this.setState({ author: '', message: '' })
        event.preventDefault();
    }

    render() {
        return (
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
                    
                </div>
            </form>

        );
    }
}

const mapDispatchToProps = dispatch => ({
    addChat: (author, message) => dispatch(postChat(author, message))
})

export default connect(
    null,
    mapDispatchToProps
)(ChatForm)