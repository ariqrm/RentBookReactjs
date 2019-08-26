import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { GlobalConsumer } from '../../context/context'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './Add.css'
import Axios from 'axios'

export class ModalExample extends React.Component {
    state = {
        book: [],
        formData: {
            Image: "",
            Title: "",
            DateReleased: "",
            id_genre: 1,
            id_status: 2,
            Description: ""
        },
        isAddData: false
    }
    handleHome = ()=> {
        this.setState({
            isAddData: false
        })
        window.location.reload()
    }
    getPostAPI = () => {
        const token = JSON.parse(localStorage.getItem("Token="))
        Axios.post(`http://localhost:3010/books/`, this.state.formData, 
            { headers: { Authorization: token }}
        )
            .then((response) => {
                console.log(response);
                this.setState({
                    book: response.data,
                    isAddData: true
                })
            })
            .catch(err => console.log(err))
    }
    handleAddBook = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        // console.log('form change', event.target.value);
        // console.log('name change', event.target.name);
        this.setState({
            formData: newFormData
        })
    }
    handleSubmit = () => {
        console.log(this.state.formData)
        this.getPostAPI()
    }
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("mySidenav").style.display = "none";
    }
    render() {
        return (
            <div>
                <Link to="#" onClick={this.props.toggle}>Add Book</Link>
                <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} size="lg">
                    <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.toggle} charCode="x">Add Data</ModalHeader>
                    <ModalBody>
                        <div className="boxModal">
                            <div>
                                <input onChange={this.handleAddBook} name="Image" type="text" placeholder="Url Image" required />
                                <label>Url image</label>
                            </div>
                            <div>
                                <input onChange={this.handleAddBook} name="Title" type="text" placeholder="Title of books" required />
                                <label>Title</label>
                            </div>
                            <div>
                                <input onChange={this.handleAddBook} name="DateReleased" type="date" required />
                                <label>Released</label>
                            </div>
                            <div>
                                <select onChange={this.handleAddBook} name="id_genre">
                                    {
                                        this.props.state.genre.map(genre =>{
                                            return <option key={genre.id} value={genre.id}>{genre.NameOfGenre}</option>
                                        })
                                    }
                                </select>
                                <label>Genre</label>
                            </div>
                            <div>
                                <textarea onChange={this.handleAddBook} name="Description" placeholder="Description" required />
                                <label>Description</label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" className="ModalBtn" onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.isAddData}>
                    <ModalHeader style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Success</ModalHeader>
                    <ModalBody>
                        <div className="boxModal">
                            <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }}>Success Add Book</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" className="ModalBtn" onClick={this.handleHome}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default GlobalConsumer(ModalExample);