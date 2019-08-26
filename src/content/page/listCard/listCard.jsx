import React, { Component, Fragment } from 'react'
import Card from '../../../component/Card/Card'
// import Eplore from './explore'
import { GlobalConsumer } from '../../../context/context'
import Navbar from '../../../component/Navbar/Navbar'
import './listCard.css'
import Caraosel from '../../../component/caraosel'
import PageButton from './pageButton';

class listCard extends Component {
    handleViewDetail = (id) =>{
        this.props.history.push(`/home/detail-book/${id}`)
    }
    render () {
        return (
            <Fragment>
                <Navbar />
                <Caraosel/>
                <div className="boxContent">
                    <button className="btnAvailable" name="available" onClick={this.props.handleSubmit}>available</button>
                    <button className="btnBorrow" name="borrowed" onClick={this.props.handleSubmit}>borrowed</button>
                    <h1 style={{ color: "grey", textAlign: "center" }}>List Book</h1 >
                    {
                        this.props.state.book.map(book => {
                            return <Card key={book.id} data={book} viewDitail={this.handleViewDetail} remove={this.handleRemove} update={this.handleUpdate} />
                        })
                    }
                    <PageButton />
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(listCard)
