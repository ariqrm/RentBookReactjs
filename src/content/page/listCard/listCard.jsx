import React, { Component, Fragment } from 'react'
import Card from '../../../component/Card/Card'
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
                    <h1 style={{ color: "grey", textAlign: "center" }}>List Book</h1 >
                    {
                        this.props.state.book.map(book => {
                            return <Card key={book.id} data={book} viewDitail={this.handleViewDetail} />
                        })
                    }
                </div>
                    <PageButton />
            </Fragment>
        )
    }
}

export default GlobalConsumer(listCard)
