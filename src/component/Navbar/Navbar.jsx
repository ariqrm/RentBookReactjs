// import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { GlobalConsumer } from '../../context/context';
import ModalExample from '../Modal/Add';

class Navbar extends Component {
    handleHome = ()=>{
        document.location.reload()
    }
    componentDidMount(){
        this.props.getYearAPI()
    }
    render() {
        return (
            <Fragment>
                <div id="mySidenav" className="sidenav">
                    <img src="http://clws.karnataka.gov.in/assets/icons/manager.png" alt=""/>
                    <p>{this.props.state.user.Username}</p>
                    <Link onClick={this.props.handleSidebar} to="/home/explore">Explore</Link>
                    
                    <Link onClick={this.props.handleSidebar} to="/home/history">History</Link>
                    <ModalExample />
                </div>
                <nav className="navigation">
                    <span id="burger" onClick={this.props.handleSidebar}>&#9776;</span>
                    <div className="dropdown">
                        <Link to="#" onClick={this.handleHome}>
                            <button className="dropbtn">All Category <FontAwesomeIcon icon={faSortDown} /></button>
                        </Link>
                        <div className="dropdown-content">
                            {
                                this.props.state.genre.map(genre => {
                                    return <button 
                                    onClick={this.props.handleSubmit} 
                                    name="G.NameOfGenre" 
                                    key={genre.id} to="#" 
                                    value={genre.NameOfGenre} >{genre.NameOfGenre}
                                    </button>
                                })
                            }
                        </div>
                    </div>
                    <div className="dropdown">
                    <Link to="#" onClick={this.handleHome}>
                        <button className="dropbtn">All Time <FontAwesomeIcon icon={faSortDown} /></button>
                    </Link>
                        <div className="dropdown-content">
                            {
                                this.props.state.years.map((years,index)=>{
                                    return <button
                                        onClick={this.props.handleSubmit}
                                        name="B.DateReleased" 
                                        key={index} to="#"
                                        value={ years.year }>{ years.year}
                                        </button>
                                     
                                })
                            }
                            {/* <Link to="/">All Category</Link>
                            <Link to="/time">All Time</Link>
                            <Link to="/CardBook">CardBook</Link>
                            <Link to="/Login">Login</Link> {document.cookie.split('=')[1]}
                            <Link to="/Register">Register</Link> */}
                        </div>
                    </div>
                    <SearchBox />
                    <img src="https://s3-alpha-sig.figma.com/img/5ef4/f6ec/e84f39e17cc61b2c69a33b9ad6d7736e?Expires=1567382400&Signature=BIb3Rr5PdM4FgT80aIXHtY-1waIiqI3usAtfDL79yrRiUkYzQDJbXcnFgtqcRMfZe2tglbEO2yRBc-vbg5e4FetONSgBVInok4ow7OzjSep5aqbuzcVUoGbqY91URULF1rPQbfqlaQS0JKAVsZkNqGrpnFzFLVQNIQek~vMu5A6oRw2fqKchwZbuEdTY37mRx9G6W5gG1uISPGTreyWYTkkz93Op4-j30UHkcZMGDpmn6qbiDzDdK5mk1He5aqAugRNqEGuEbs3WfvgrDviUeXeLeWPVuwVuQXbbxbWYD8AMBkcTGZPOfhDM4znqjO~K-37~~ndicWGy~8s7yDZ6fg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />                    
                    <span className="library" >Library</span>
                </nav> 
            </Fragment>
        )
    }
}

export default GlobalConsumer(Navbar)
