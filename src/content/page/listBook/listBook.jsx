import React, { Component, Fragment } from 'react'
// import axios from 'axios'
import Post from '../../../component/Post/Post';
import './listBook.css'
import { GlobalConsumer } from '../../../context/context';

class listBook extends Component {
    render () {
        return (
            <Fragment>
                <div>
                    <p>data</p>
                    {
                        this.props.state.book.map(book => {
                            return <Post key={book.id} data={book} viewDitail={this.handleViewDetail} remove={this.handleRemove} update={this.handleUpdate} />
                        })
                    }
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(listBook)
