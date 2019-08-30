import { combineReducers } from 'redux';

import item from './items';
import book from './book'
import modal from './modal';
import genre from './genre';
import user from './user';
import transaction from './transaction';

const rootReducer = combineReducers({
    item,
    book,
    genre,
    modal,
    user,
    transaction,
});

export default rootReducer;
