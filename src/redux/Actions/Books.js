import Axios from 'axios';

const token = JSON.parse(localStorage.getItem("Token="))
export const getBook = () => {
    return {
        type: 'GET_BOOK',
        payload: Axios.get(`http://localhost:3010/books`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const getFilterBook = (title, coloum, page, available) => {
        const mTitle = title || ""
        const mColoum = coloum || "B.Title"
        const mPage = page || 1
        const mavailable = available || "available"
    return {
        type: 'GET_BOOK_FILTER',
        payload: Axios.get(`http://localhost:3010/books?search=${mTitle}&available=${mavailable}&coloum=${mColoum}&sort=id&by=DESC&limit=12&page=${mPage}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const getBookId = (id) => {
    return {
        type: 'GET_BOOK_ID',
        payload: Axios.get(`http://localhost:3010/books/${id}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const addBook = (data) => {
    return {
        type: 'ADD_BOOK',
        payload: Axios.post('http://localhost:3010/books', data, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const deleteBook = (myId) => {
    return {
        type: 'DELETE_BOOK',
        payload: Axios.delete(`http://localhost:3010/books/${myId}`, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const updateBook = (myId, data) => {
    return {
        type: 'UPDATE_BOOK',
        payload: Axios.patch(`http://localhost:3010/books/${myId}`, data, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const transaction = (query, data) => {
    return {
        type: 'TRANSACTION_BOOK',
        payload: Axios.post(query, data, {
            headers: {
                Authorization: token,
            },
        }),
    };
};
export const getYear = ()=> {
    return {
        type: 'GET_YEAR',
        payload: Axios.get(`http://localhost:3010/books/year`)
    }
}