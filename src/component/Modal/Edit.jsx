import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GlobalConsumer } from '../../context/context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Add.css'

export class ModalEditBook extends React.Component {

    render() {
        return (
            <div>
                <Link to="#" onClick={this.props.toggle}>Edit Book</Link>
                <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} size="lg">
                    <ModalHeader style={{ fontWeight: "bold", color: "black" }} toggle={this.props.toggle} charCode="x">Edit Data</ModalHeader>
                    <ModalBody>
                        <div className="boxModal">
                            <div>
                                <input name="Image" type="text" placeholder="Url Image" required />
                                <label>Url image</label>
                            </div>
                            <div>
                                <input name="Title" type="text" placeholder="Title of books" required />
                                <label>Title</label>
                            </div>
                            <div>
                                <input name="DateReleased" type="date" required />
                                <label>Released</label>
                            </div>
                            <div>
                                <select name="id_genre">
                                    {
                                        this.props.state.genre.map(genre => {
                                            return <option key={genre.id} value={genre.id}>{genre.NameOfGenre}</option>
                                        })
                                    }
                                </select>
                                <label>Genre</label>
                            </div>
                            <div>
                                <textarea name="Description" placeholder="Description" required />
                                <label>Description</label>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="warning" className="ModalBtn" onClick={this.props.toggle}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default GlobalConsumer(ModalEditBook);