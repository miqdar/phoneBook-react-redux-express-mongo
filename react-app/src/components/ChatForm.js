import React from 'react'

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            message: ''
        };

        this.handleChangeMessage = this.handleChangeMessage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeAuthor = (event) => {
        this.setState({ author: event.target.value });
    }

    handleChangeMessage(event) {
        this.setState({ message: event.target.value });
    }

    handleSubmit(event) {
        this.props.addChat(this.state.author, this.state.message);
        this.setState({ author: '', message: '' })
        event.preventDefault();
    }


    render() {
        return (
            <div>
            <form className="career-form mb-60" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6 col-lg-3 my-3">
                        <div className="input-group position-relative">
                            <input type="text" className="form-control" value={this.state.author} onChange={this.handleChangeAuthor} placeholder="masukkan nama" />
                        </div>
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                            <div className="input-group position-relative">
                                <input type="text" className="form-control" value={this.state.message} onChange={this.handleChangeMessage} placeholder="masukkan no Hp" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                                <input className="btn btn-lg btn-block btn-light btn-custom" id="contact-submit" type="submit" value="Submit" />
                        </div>
                        <div className="col-md-6 col-lg-3 my-3">
                                <input className="btn btn-lg btn-block btn-light btn-custom" id="contact-submit" type="submit" value="Search" />
                        </div>
                    </div>
            </form>
            </div>
        );
    }
}