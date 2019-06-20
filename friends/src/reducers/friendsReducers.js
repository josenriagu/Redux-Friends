import { ADD_FRIENDS } from '../actions';

const initialState = {
    deletingFriend: false,
    fetchingFriends: false,
    friends: [],
    loggingIn: false,
    savingFriends: false,
    updatingFriend: false,
    error: null
}

const friendsReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        default:
            return state
    }
}

export default friendsReducers;