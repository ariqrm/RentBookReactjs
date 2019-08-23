import React, { Component, Fragment } from 'react'
import { GlobalConsumer } from '../../../context/context';
import Post from '../../../component/Post/Post';
import Navbar from '../../../component/Navbar/Navbar';
// import { GlobalConsumer } from '../../../context/context';

export class MyHistory extends Component {
    render() {
        console.log(this.props)
        return (
            <Fragment>
                <div>
                    <Navbar />
                    <br/>
                    <br/>
                    <br/>
                    <h1 style={{ color: "grey", textAlign: "center"}}>History</h1 >
                    <br />
                    <div style={{ alignContent: "center", textAlign: "-webkit-center"}}>
                        {
                            this.props.state.transaction.map(transaction => {
                                return <Post key={transaction.id} data={transaction} />
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(MyHistory)
