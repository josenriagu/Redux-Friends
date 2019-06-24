// import axios for the login action creator
import axios from 'axios';
import enrichedAxios from 'axios';

// assign token to a variable

// define action types
export const ADD_FRIEND = "ADD_FRIEND";
export const ADD_FRIENDS = "ADD_FRIENDS";
export const EDIT_FRIEND = "EDIT_FRIEND";
export const DELETE_FRIEND = " DELETE_FRIEND";

export const login = (username, password) => () => {
    const credentials = { username, password };

    axios.post('http://localhost:5000/api/login', credentials)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            window.location.pathname = "/";
        })
        .catch(err => {
            console.log(err.message)
        })
        .finally(() => {
        });
};

export const fetchFriends = () => dispatch => {
    enrichedAxios.get('http://localhost:5000/api/friends')
        .then(response => {
            dispatch({ type: ADD_FRIENDS, payload: response.data });
        })
        .catch(err => {
            return   (err.message);
        })
}

export function addFriend(name, age, email) {
    return {
        type: ADD_FRIEND,
        payload: {
            name,
            age,
            email,
        },
    };
}

export function addFriends(friends) {
    return {
        type: ADD_FRIENDS,
        payload: friends,
    };
}