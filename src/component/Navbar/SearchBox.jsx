import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { GlobalConsumer } from '../../context/context'
class SearchBox extends Component {
    state = {
        null: ""
    }
    render() {
        return (
            <Fragment>
                <div className="seacrhBox">
                    <FontAwesomeIcon icon={ faSearch }/>
                    <input name="B.Title" onChange={this.props.handleSearch} onKeyPress={this.props.handleSubmit} type="text" placeholder="Search..." />
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(SearchBox)
