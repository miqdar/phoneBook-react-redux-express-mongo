import React from 'react';
import { connect } from 'react-redux';
import { updateChat } from '../actions';

class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            author: this.props.author,
            message: this.props.message
        }
    }

    handleChangeAuthor = (event) => {
        this.setState({ author: event.target.value });
    }

    handleChangeMessage = (event) => {
        this.setState({ message: event.target.value });
    }

    handleSubmit = (event) => {
        console.log('aa')
        this.props.updateChat(this.state.id, this.state.author, this.state.message);
        this.setState({ author: '', message: '' })
        event.preventDefault();
    }

    cancelEdit = (event) => {
        console.log('cancel yah')
        
        event.preventDefault();
    }

    render() {
        if (this.props.edit) {
            return (
                <form>
                    <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                        <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                            <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                                Photo
                            </div>
                            <div className="job-content">
                                <input id="author" type="text" className="form-control w-100" value={this.state.author} onChange={this.handleChangeAuthor} placeholder="Insert Name" />
                                <input id="message" type="text" className="form-control w-100" value={this.state.message} onChange={this.handleChangeMessage} placeholder="Insert Phone Number" />
                            </div>
                        </div>
                        <div className="job-right my-4 flex-shrink-0">
                            <button type="submit" className="btn d-block w-100 d-sm-inline-block btn-primary"
                                onClick={this.handleSubmit}>Update
                            </button>
                            <button type="button" className="btn d-block w-100 d-sm-inline-block btn-secondary"
                                onClick={this.props.falsekanEdit}>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )
        } else {
            return (

                <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                    <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                        <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex">
                            Photo
                    </div>
                        <div className="job-content">
                            <h5 className="text-center text-md-left">{this.props.author}</h5>
                            <ul className="d-md-flex flex-wrap text-capitalize ff-open-sans">
                                <li className="mr-md-4">
                                    <i className="zmdi zmdi-phone"></i> {this.props.message}
                                </li>
                                <li className="mr-md-4">
                                    <i className="zmdi zmdi-pin mr-2"></i> Bandung
                        </li>
                            </ul>
                        </div>
                    </div>
                    <div className="job-right my-4 flex-shrink-0">
                        <button type="button" className={this.props.sent ? 'btn d-block w-100 d-sm-inline-block btn-danger' : 'btn d-block w-100 d-sm-inline-block btn-warning'}
                            onClick={this.props.sent ? this.props.remove : this.props.resend}>{this.props.sent ? 'Delete' : 'Resend'}
                        </button>
                        <button type="button" className="btn d-block w-100 d-sm-inline-block btn-secondary"
                            onClick={this.props.truekanEdit}>Edit
                        </button>
                    </div>
                </div>

            )
        }
    }
}

const mapDispatchToProps = dispatch => ({
    updateChat: (id, author, message) => dispatch(updateChat(id, author, message))
})

export default connect(
    null,
    mapDispatchToProps
)(ChatForm)