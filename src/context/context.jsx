import React, { createContext, Component } from 'react';
import Axios from 'axios';

const RootContext = createContext();
// Provider
const Provider = RootContext.Provider;
const GlobalProvider = (Childern) => {
    return (
        class ParentComp extends Component {
            constructor(props){
                super(props)
                this.state = {
                    users: [],
                    alluser: [],
                    years: [],
                    transaction: [],
                    title: "",
                    page: 1,
                    coloum: "B.Title",
                    status: "available",
                    token: "",
                    Username: "",
                    user: {
                        Email: "",
                        Full_name: "",
                        Username: "",
                        access: "",
                        create_at: "",
                        id: 4,
                        update_at: ""
                    },
                    modal: false,
                    book: [],
                    genre: [],
                    formgenre: {
                        id: 1,
                        NameOfGenre: ""
                    },
                    formDataUser: {
                        email: "",
                        username: "",
                        full_name: "",
                        password: ""
                    },
                    formData: {
                        Image: "",
                        Title: "",
                        DateReleased: "",
                        id_genre: 1,
                        id_status: 2,
                        Description: ""
                    },
                    isUpdateData: false,
                    sidebar: false
                }
            }
            
            openNav = () => {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
                document.getElementById("mySidenav").style.display = "block";

            }

            closeNav = () => {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft = "0";
                document.getElementById("mySidenav").style.display = "none";
            }
            handleSidebar = () => {
                if (this.state.sidebar === false) {
                    this.openNav()
                    this.setState({
                        sidebar: true
                    })
                } else {
                    this.closeNav()
                    this.setState({
                        sidebar: false
                    })
                }
            }
            toggle = () => {
                if (this.state.modal === false) {
                    this.setState({
                        modal: true
                    })
                    const style1 = document.getElementById("mySidenav")
                    if(style1 === null){
                    } else{
                        document.getElementById("mySidenav").style.width = "0";
                        document.getElementById("main").style.marginLeft = "0";
                        document.getElementById("mySidenav").style.display = "none";
                    }
                } else {
                    this.setState({
                        modal: false,
                        sidebar: false
                    })
                }
            }
            getGenreAPI = () => {
                Axios.get(`http://localhost:3010/genre`)
                    .then((respons) => {
                        console.log(respons.data.data);
                        this.setState({
                            genre: respons.data.data
                        })
                    })
            }
            getTransactionAPI = () => {
                Axios.get(`http://localhost:3010/transaction/`)
                    .then((respons) => {
                        console.log(respons.data.data);
                        this.setState({
                            transaction: respons.data.data
                        })
                    })
            }
            getYearAPI = () => {
                Axios.get(`http://localhost:3010/books/year/`)
                    .then((respons) => {
                        console.log(respons.data.data);
                        this.setState({
                            years: respons.data.data
                        })
                    })
            }
            getPostAPI = (title, coloum, page, available) => {
                const mTitle = title || this.state.title
                const mColoum = coloum || this.state.coloum
                const mPage = page || this.state.page
                const mavailable = available || this.state.status
                Axios.get(`http://localhost:3010/books?search=${mTitle}&available=${mavailable}&coloum=${mColoum}&sort=id&by=DESC&limit=12&page=${mPage}`)
                    .then((respons) => {
                        // console.log(respons);
                        this.setState({
                            book: respons.data.data,
                            coloum: mColoum,
                            page: mPage,
                            title: mTitle,
                            status: mavailable
                        })
                    })
            }
            getSearchPostAPI = () => {
                Axios.get(`http://localhost:3010/books?search=${this.state.title}&available=${this.state.status}&coloum=${this.state.coloum}&sort=id&by=DESC&limit=12&page=${this.state.page}`)
                    .then((respons) => {
                        this.setState({
                            book: respons.data.data
                        })
                        console.log('axios get')
                        // setInterval(() => {
                        //     this.setState({
                        //         title: " ",
                        //         coloum: "B.Title"
                        //     })
                        // }, 10000);
                        // if(this.state.book !== null){
                        // }
                    })
            }
            getUserToken = () => {
                Axios.get(`http://localhost:3010/user/`)
                    .then((respons) => {
                        this.setState({
                            alluser: respons.data.data
                        })
                    })
                console.log('token', this.state.token)
                console.log('token', document.cookie.split("=")[1])
            }
            dispatch = (action) => {
                if (action.type === 'PLUS_PAGE') {
                    if(this.state.book.length < 12){
                        
                    } else {
                        let page = this.state.page + 1
                        this.getPostAPI(this.state.title, this.state.coloum, page, this.state.status)
                    }
                }
                if (action.type === 'MINUS_PAGE') {
                    if (this.state.page > 1) {
                        let page = this.state.page - 1
                        this.getPostAPI(this.state.title, this.state.coloum, page, this.state.status)
                    }else{
                        return this.getPostAPI()
                    }
                }
            }
            handleSearch = (event) => {
                var newColoum = { ...this.state.coloum }
                newColoum = event.target.name
                var newTitle = { ...this.state.title }
                newTitle = event.target.value
                // console.log('form change', event.target.value)
                // console.log('name change', event.target.name)
                this.setState({
                    title: newTitle,
                    coloum: newColoum
                })
            }
            componentDidMount() {
                console.log('mount')
                this.getPostAPI()
                this.getGenreAPI()
                // this.handleDataAuth()
                // this.getTransactionAPI()
            }
            handleSubmit = (event) => {
                const page = 1
                if (event.key === "Enter") {
                    // console.log(event.key)
                    // console.log(event.target.value)
                    this.setState({
                        title: event.target.value,
                        coloum: event.target.name
                    })
                    this.getSearchPostAPI()
                } else if (event.target.name === "G.NameOfGenre") {
                    this.getPostAPI(event.target.value, event.target.name, page)
                } else if (event.target.name === "B.DateReleased") {
                    this.getPostAPI(event.target.value, event.target.name, page)
                } else if (event.target.name === "borrowed") {
                    // this.getPostAPI(this.state.title, this.state.coloum, this.state.page, event.target.name)
                    this.getPostAPI(this.state.title, this.state.coloum, page, event.target.name)
                } else if (event.target.name === "available") {
                    this.getPostAPI(this.state.title, this.state.coloum, page, event.target.name)
                }
            }
            handleForm = (event) => {
                var newFormData = { ...this.state.formData };
                newFormData[event.target.name] = event.target.value;
                // console.log('form change', event.target.value);
                // console.log('name change', event.target.name);
                this.setState({
                    formData: newFormData
                })
            }
            getPostAPILogin = (data) => {
                Axios.post(`http://localhost:3010/user/signin`, data)
                    .then((response) => {
                        console.log(response.data.data.token);
                        this.setState({
                            user: response.data.data.data,
                            users: response.data.data,
                            Username: response.data.data.data.Username
                        })
                        if (response.data.success === true) {
                            const myToken = response.data.data.token
                            const myData = response.data.data.data
                            localStorage.setItem('Token=', JSON.stringify(myToken));
                            localStorage.setItem('Data=', JSON.stringify(myData));
                            this.handleDataAuth()
                            // document.cookie = 'Token=' + response.data.data.token
                            window.location.replace('/home')
                            // var retrievedObject = localStorage.getItem('Token=');
                            // console.log('retrievedObject: ', JSON.parse(retrievedObject));
                            // this.props.state.user = response.data.data.data
                        }
                    })
                    .catch(err => console.log(err))
            }
            handleDataAuth = () => {
                const data = JSON.parse(localStorage.getItem('Data='))
                this.setState({
                    user: data
                })
                const auth = localStorage.getItem('Token=')
                if (!auth) {
                    document.location.replace("http://localhost:3030/login")
                }
            }
            render() {
                return (
                    <Provider value={
                        {
                            state: this.state,
                            toggle: this.toggle,
                            dispatch: this.dispatch,
                            handleSearch: this.handleSearch,
                            handleSubmit: this.handleSubmit,
                            handleForm: this.handleForm,
                            handleSidebar: this.handleSidebar,
                            getYearAPI: this.getYearAPI,
                            getPostAPILogin: this.getPostAPILogin,
                            handleDataAuth: this.handleDataAuth
                        }
                    }>
                        <Childern {...this.props} />
                    </Provider>
                )
            }
        }
    )
}
export default GlobalProvider;

// Consumer
const Consumer = RootContext.Consumer;
export const GlobalConsumer = (Childern) => {
    return (
        class ParentConsumer extends Component {
            render() {
                return (
                    <Consumer>
                        {
                            value => {
                                return (
                                    <Childern {...this.props} {...value} />
                                )
                            }
                        }
                    </Consumer>
                )
            }
        }
    )
}