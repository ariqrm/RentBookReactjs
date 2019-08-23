import React, { Component } from 'react';
import { GlobalConsumer } from '../../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class PageButton extends Component {
    render() {
        return (
            <div className="counter">
                <button className="minus" onClick={() => this.props.dispatch({ type: 'MINUS_PAGE' })}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <input type="text" disabled="disabled" value={this.props.state.page} />
                <button className="plus" onClick={() => this.props.dispatch({ type: 'PLUS_PAGE' })}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        )
    }
}

export default GlobalConsumer(PageButton);