const initialState = {
    itemList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const item = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITEM_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            };
        case 'GET_ITEM_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'GET_ITEM_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                itemList: action.payload.data.data,
            };
        default:
            return state;
    }
};

export default item;