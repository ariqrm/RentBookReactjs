import React, { Component, Fragment } from 'react';
// import Axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { GlobalConsumer } from '../../../context/context';

class Login extends Component {
    state = {
        user: [],
        formData: {
            email: "",
            username: "",
            full_name: "",
            password: ""
        },
        token: "",
        isUpdateData: false
    }
    handleLogin = (event) => {
        var newFormData = { ...this.state.formData };
        newFormData[event.target.name] = event.target.value;
        // console.log('form change', event.target.value);
        // console.log('name change', event.target.name);
        // console.log('name change', this.state.formData);
        this.setState({
            formData: newFormData
        })
    }
    handleSubmit = () => {
        console.log(this.state.formData)
        const dataUser = this.state.formData
        this.props.getPostAPILogin(dataUser)
    }
    render() {
        return (
            <Fragment>
                <div className="Login">
                    <div className="main">
                        <img src="https://s3-alpha-sig.figma.com/img/42af/e6f5/6406744294af0e36bd58a6bb9d5bade1?Expires=1567382400&Signature=GNF0t9kIgABnuHMnI7Ygre64zezNTfYZI416AXZH5mWHiNNpU4BQ6ElmBqhgmicEp8cNBa7Tg0pmpu9OHUyENjfMdm7E~h4dSl4WfuiGVrPQWZHB0b1MfC1-9E38KnqLacN4EpVZtjNOV6gB4vvvBKW80z1bGRhLjv2z9OrCmunrUFUkStBp~2~ExRLmOaAQegWWJZLJ2RrFZD~0qvYk~kTnnhk5J9HdIiGYpy5yvXaUq3isyopNfbL6HZlspAlw772iad5XQ4CWGIuWTg4mtKzZpKg39GWuO1Ej9h1GCYbDpdE1DYhw1zS4k0dHkg6JdI-zL9N0pXk7RF~fqc-7Uw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
                        <div className="hero-text2">
                            <p>Book is a window to the world</p>
                        </div>
                        <div className="hero-text">
                            <p>Photo by Mark Pan4ratte on Unsplash</p>
                        </div>
                    </div>
                    <div className="LoginLogo">
                        <img src="https://s3-alpha-sig.figma.com/img/5ef4/f6ec/e84f39e17cc61b2c69a33b9ad6d7736e?Expires=1567382400&Signature=BIb3Rr5PdM4FgT80aIXHtY-1waIiqI3usAtfDL79yrRiUkYzQDJbXcnFgtqcRMfZe2tglbEO2yRBc-vbg5e4FetONSgBVInok4ow7OzjSep5aqbuzcVUoGbqY91URULF1rPQbfqlaQS0JKAVsZkNqGrpnFzFLVQNIQek~vMu5A6oRw2fqKchwZbuEdTY37mRx9G6W5gG1uISPGTreyWYTkkz93Op4-j30UHkcZMGDpmn6qbiDzDdK5mk1He5aqAugRNqEGuEbs3WfvgrDviUeXeLeWPVuwVuQXbbxbWYD8AMBkcTGZPOfhDM4znqjO~K-37~~ndicWGy~8s7yDZ6fg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt=""/>
                    </div>
                    <div className="hero-text3">
                        <p>By signing up, you agree to Book’s &nbsp;
                            <Link to="#">Terms and Conditions</Link> &&nbsp;
                            <Link to="#">Privacy Policy</Link></p>
                    </div>
                    <div className="hero-text4">
                        <p>Welcome Back, Please Login to your account</p>
                    </div>
                        <h1>Login</h1>
                    <div className="box">
                        <div>
                            <input type="text" name="email" onChange={this.handleLogin} required />
                            <label>Email</label>
                        </div>
                        <div>
                            <input type="password" name="password" onChange={this.handleLogin} required />
                            <label>Password</label>
                        </div>
                        <div>
                            <input type="checkbox" name="rememberMe" />
                            <p>Remember me</p>
                            <p>Forgot Password</p>
                        </div>
                        <input type="submit" onClick={this.handleSubmit} name="" value="Login" />
                        <input type="button" onClick={()=>this.props.history.push(`/Register`)} value="Sign Up"/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default GlobalConsumer(Login)
