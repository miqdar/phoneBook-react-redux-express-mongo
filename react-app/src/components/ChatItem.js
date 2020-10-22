import React from 'react'

export default class ChatItem extends React.Component {
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
        this.props.postUpdate(this.state.id, this.state.author, this.state.message);
        this.setState({ author: '', message: '' })
        event.preventDefault();
    }

    cancelEdit = (id) => {
        this.props.cancelEdit(id)
    }

    formEdit = (props) => {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input className="form-control input-sm" name="author" value={this.state.author} type="text" onChange={this.handleChangeAuthor} placeholder="masukkan penulis" />
                    <textarea id="btn-input" cols="2" name="message" value={this.state.message} className="form-control input-sm" onChange={this.handleChangeMessage} placeholder="masukkan pesan" />
                    <span className="input-group-btn">
                        <input className="btn btn-primary btn-sm" type="submit" value="Submit" />
                        <button type="submit" className="btn btn-secondary btn-sm"
                            onClick={() => this.props.cancelEdit(this.props.id)}>Cancel
                            </button>
                    </span>
                </div>
            </form>
        );
    }

    listItem = (props) => {
        return (
            <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                <div className="job-left my-4 d-md-flex align-items-center flex-wrap">
                    <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex"> FD </div>
                    <div className="job-content">
                        <h5 className="text-center text-md-left">{this.props.author}</h5>
                        <ul class="d-md-flex flex-wrap text-capitalize ff-open-sans">
                            <li class="mr-md-4">
                                <i class="zmdi zmdi-whatsapp"></i> {this.props.message}
                            </li>
                            <li class="mr-md-4">
                                <i class="zmdi zmdi-pin"></i> Bandung
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="job-right my-4 flex-shrink-0">
                    <button type="submit"
                        className={this.props.sent ? 'btn d-block w-100 d-sm-inline-block btn-danger' : 'btn d-block w-100 d-sm-inline-block btn-light'}
                        onClick={this.props.sent ? () => this.props.remove(this.props.id) : () => this.props.resend(this.props.id, this.props.author, this.props.message)}>
                        {this.props.sent ? 'Hapus' : 'Kirim Ulang'}
                    </button>
                    <button type="submit"
                        className="btn d-block w-100 d-sm-inline-block btn-secondary"
                        onClick={this.props.edit ? () => this.props.cancelEdit(this.props.id) : () => this.props.truekanEdit(this.props.id, this.props.author, this.props.message)}>{this.props.edit ? 'Cancel' : 'Edit'}
                    </button>
                </div>
            </div >
        )
    }


    render() {
        if (this.props.edit) {
            return this.formEdit()
        } else {
            return this.listItem()
        }
    }
}