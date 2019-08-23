import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Axios from 'axios';
import './viewDetail.css'
import { GlobalConsumer } from '../../../context/context';

class ViewDetail extends Component {
    state = {
        dataApi: [],
        date_released: "",
        date: "",
        month: "",
        year: "",
        formData: {
            date_released: "",
            description: "",
            genre: "",
            id: 1,
            image: "",
            status: "",
            title: "",
        },
        deleteData: false,
        editData: false,
        faildata: false,
        transaction: false
    }
    handleEdit = () => {
        this.setState({
            editData: false
        })
        window.location.reload()
    }
    componentDidMount() {
        let myId = this.props.match.params.id;
        Axios.get(`http://localhost:3010/books/${myId}`)
        .then(result => {
            console.log(result.data.data[0].title)
            let data = result.data.data
            this.setState({
                dataApi: data[0],
                date_released: data[0].date_released.split("T")[0]
            })
            this.setState({
                formData: this.state.dataApi,
                date_released: this.state.date_released.split("-")
            })
            this.setState({
                date: this.state.date_released[2],
                month: this.state.date_released[1],
                year: this.state.date_released[0]
            })
            this.handleBorrow()
        })
        .catch(err => {
            console.log(err)
        })
    }
    open = () => {
        document.getElementById("btnborrow").style.display = "block";
        document.getElementById("btnreturn").style.display = "none";

    }

    close = () => {
        document.getElementById("btnborrow").style.display = "none";
        document.getElementById("btnreturn").style.display = "block";
    }
    handleBorrow = () => {
        if (this.state.dataApi.status === "available") {
            this.open()
        } else {
            this.close()
        }
    }
    back = () => {
        this.setState({
            editData: false
        })
        window.location.replace("/home")
    }
    handleForm = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        console.log('form ', event.target.value);
        console.log('name ', event.target.name);
        console.log('data ', this.state.formData);
        this.setState({
            formData: newFormData
        })
    }
    handleUpdate = () => {
        let myId = this.props.match.params.id;
        Axios.patch(`http://localhost:3010/books/${myId}`, this.state.formData)
            .then(result => {
                console.log(result.data)
                if(result.data.succes === true){
                    this.setState({
                        editData: true
                    })
                } else {
                    this.setState({
                        faildata: true
                    })
                }
            })
    }
    handleRemove=()=>{
        let myId = this.props.match.params.id
        Axios.delete(`http://localhost:3010/books/${myId}`)
        .then(result => {
            console.log(result.data)
            if (result.data.succes === true) {
                this.setState({
                    deleteData: true
                })
            } else {
                this.setState({
                    faildata: true
                })
            }
        })
    }
    handleTransaction=()=>{
        let myId = { id_users: 13,id_book: this.props.match.params.id }
        const query = (this.state.dataApi.status === "available") ? `http://localhost:3010/transaction/borrow/` : `http://localhost:3010/transaction/return/`
        Axios.post(query, myId)
            .then(result => {
                console.log(result.data)
                if (result.data.success === true) {
                    this.setState({
                        transaction: true
                    })
                } else {
                    this.setState({
                        faildata: true
                    })
                }
            })
    }
    render() {
        return (
            <Fragment>
                <div>
                    <Modal isOpen={this.state.faildata}>
                        <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Failed</ModalHeader>
                        <ModalBody>
                            <div style={{ textAlignLast: "center", color: "red", textAlign: "center" }} >
                                <FontAwesomeIcon style={{ fontSize: "60px" }} icon={faCheckCircle} />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Fail update data</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" className="ModalBtn" onClick={this.handleEdit}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.editData}>
                        <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Success</ModalHeader>
                        <ModalBody>
                            <div style={{ textAlignLast: "center", color: "green", textAlign: "center"}} >
                                <FontAwesomeIcon style={{ fontSize: "60px"}} icon={ faCheckCircle } />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Data Updated</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" className="ModalBtn" onClick={this.handleEdit}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.transaction}>
                        <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Success</ModalHeader>
                        <ModalBody>
                            <div style={{ textAlignLast: "center", color: "green", textAlign: "center" }} >
                                <FontAwesomeIcon style={{ fontSize: "60px" }} icon={faCheckCircle} />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Data Updated</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" className="ModalBtn" onClick={this.handleEdit}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.deleteData}>
                        <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Success</ModalHeader>
                        <ModalBody>
                            <div style={{ textAlignLast: "center", color: "green", textAlign: "center"}} >
                                <FontAwesomeIcon style={{ fontSize: "60px"}} icon={ faCheckCircle } />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Data Deleted</p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" className="ModalBtn" onClick={this.back}>Ok</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} size="lg">
                        <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.toggle} charCode="x">Edit Data</ModalHeader>
                        <ModalBody>
                            <div className="boxModal">
                                <div>
                                    <input onChange={this.handleForm} name="image" type="text" value={this.state.formData.image}  />
                                    <label>Url image</label>
                                </div>
                                <div>
                                    <input onChange={this.handleForm} name="title" type="text" value={this.state.formData.title}  />
                                    <label>Title</label>
                                </div>
                                <div>
                                    <input onChange={this.handleForm} name="date_released" type="date"  />
                                    <label>Released</label>
                                </div>
                                <div>
                                    <select onChange={this.handleForm} name="genre">
                                        {
                                            this.props.state.genre.map(genre => {
                                                return <option key={genre.id} value={genre.id}>{genre.NameOfGenre}</option>
                                            })
                                        }
                                    </select>
                                    <label>Genre</label>
                                </div>
                                <div>
                                    <textarea onChange={this.handleForm} name="description" value={this.state.formData.description}  />
                                    <label>Description</label>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="warning" className="ModalBtn" onClick={this.handleUpdate}>Save</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                <div className="pageDetail">
                    <div className="viewDetail">
                        <img id="cover" src={this.state.dataApi.image} alt="" />
                    </div>
                    <button id="back" onClick={this.back}>
                        <FontAwesomeIcon icon={ faArrowLeft } />
                    </button>
                    <div id="action">
                        <Link onClick={this.props.toggle} to="#" id="edit">Edit</Link>
                        <Link onClick={this.handleRemove} to="#" id="delete">Delete</Link>
                    </div>
                    <img id="vit" src={this.state.dataApi.image} alt=""/>
                    <div id="detailInfo">
                        <button id="genre">{this.state.dataApi.genre}</button>
                    <div id="btnborrow">
                        <button id="borrow" onClick={this.handleTransaction}>borrow</button>
                    </div>
                    <div id="btnreturn">
                        <button id="return" onClick={this.handleTransaction}>return</button>
                    </div>
                        <p id="title"> {this.state.dataApi.title} </p>
                        <p id="Released">{this.state.date + " " + this.state.month + " " + this.state.year}</p>
                        <p id="status"> {this.state.dataApi.status}</p>
                        <p id="desc">  {this.state.dataApi.description} </p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(ViewDetail)
