import Axios from 'axios';

const token = JSON.parse(localStorage.getItem("Token="))
export const getItem = () => {
    return {
        type: 'GET_ITEM',
        payload: Axios.get('http://localhost:3010/books', {
            headers: {
                Authorization: token,
            },
        }),
    };
};