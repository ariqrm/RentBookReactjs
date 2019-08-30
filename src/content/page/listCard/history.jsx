import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import NavBar from '../../../component/Navbar/Navbar';
import { connect } from 'react-redux';
import { getReturn, getBorrow } from '../../../redux/Actions/Transaction';
import { userInfo } from '../../../redux/Actions/Users';

class HistoryTransaction extends Component {
    componentDidMount= async ()=>{
        const id_users = this.props.user.userInfo.id
        await this.props.GetBorrow(id_users)
        await this.props.GetReturn(id_users)
    }
    render() { 
        // console.log(this.props.transaction)
        const data = this.props.transaction
        return (
            <Fragment>
                <NavBar />
                <br/>
                <br/><br/><br/>
                <Table borderless style={{textAlignLast: "center", borderTop: "outset"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id {this.props.user.userInfo.id}</th>
                            <th>Book Name</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.transactionListBorrow ?
                            data.transactionListBorrow.map(transaction => {
                                return <tr>
                                    <th>{transaction.Image.substr(0, 10)}</th>
                                    <td>{transaction.id_book}</td>
                                    <td>{transaction.Title}</td>
                                    <td>{transaction.id_status}</td>
                                </tr>
                            })
                            :
                            <tr>
                                <td>Loading</td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        transaction: state.transaction,
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        UserInfo: () => dispatch(userInfo()),
        GetReturn: (id) => dispatch(getReturn(id)),
        GetBorrow: (id) => dispatch(getBorrow(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTransaction)