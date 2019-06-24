import React, { Component } from 'react';
import enrichedAxios from './../axios';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFriends } from './../actions';
import Home from './../components/Home';
import Friends from './../components/Friends';
import FriendForm from './../components/FriendForm';
import Login from './../components/Login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                age: 0,
                email: ""
            },
            editMode: false,
            friendToEdit: null,
        }
    }

    componentDidMount() {
        debugger;
        this.props.fetchFriends();
    }

    inputChange = (field, value) => {
        this.setState((state) => {
            return {
                form: {
                    ...state.form,
                    [field]: value
                }
            };
        });
    }
    changeHandler = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        this.inputChange(field, value);
    }

    addFriend = event => {
        event.preventDefault()
        const { name, age, email } = this.state.form;
        // const list = this.state.friendsList;
        // const last = list[list.length - 1];
        const newFriend = {
            // id: last.id + 1,
            name: name,
            age: Number(age),
            email: email
        }
        enrichedAxios().post('http://localhost:5000/friends', newFriend)
            .then((response) => {
                this.setState(() => ({
                    friendsList: response.data,
                    form: {
                        name: "",
                        age: 0,
                        email: ""
                    },
                    editMode: false,
                    friendToEdit: null,
                }))
            }).catch(err => console.log(err.message))
        window.location.pathname = "/friends/list"
    }

    setEdit = (id) => {
        const friendToEdit = this.state.friendsList.find(friend => friend.id === id);
        this.setState({
            ...this.state,
            form: {
                name: friendToEdit.name,
                age: friendToEdit.age,
                email: friendToEdit.email
            },
            editMode: true,
            friendToEdit,
        });
    }

    updateFriend = (event, id) => {
        event.preventDefault()
        const { name, age, email } = this.state.form;
        const updatedFriend = {
            id: id,
            name: name,
            age: age,
            email: email
        }
        enrichedAxios().put(`http://localhost:5000/friends/${id}`, updatedFriend)
            .then((response) => {
                this.setState(() => ({
                    friendsList: response.data,
                    form: {
                        name: "",
                        age: 0,
                        email: ""
                    },
                    editMode: false,
                    friendToEdit: null,
                }))
            }).catch(err => console.log(err.message))
        alert('Friend Updated!')
        // window.location.reload();
        window.location.pathname = "/friends/list"
    }

    deleteFriend = id => {
        enrichedAxios().delete(`http://localhost:5000/friends/${id}`)
            .then((response) => {
                this.setState(() => ({
                    friendsList: response.data,
                }))
            }).catch(err => console.log(err.message))
    }

    render() {
        if (!localStorage.getItem('token')) {
            return (
                <div className="app-wrapper">
                    <Redirect to="/login" />

                    <Route
                        path="/login"
                        component={Login}
                    />
                </div>
            );
        }
        return (
            <div className="app-wrapper">
                <section className="landing">
                    <h1>My Buddies List</h1>
                    <div className="naver">
                        <NavLink
                            exact
                            className="nav-link"
                            activeClassName="active"
                            to="/"
                        >
                            Home
            </NavLink>
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to={
                                (this.state.editMode)
                                    ?
                                    "/friends/edit-friend"
                                    :
                                    "/friends/add-friend"
                            }
                        >
                            Add Friend
            </NavLink>
                        <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/friends/list"
                        >
                            View Friends
            </NavLink>
                    </div>
                </section>

                <section className="app-section">
                    <Route
                        exact
                        path="/"
                        render={Home}
                    />
                    <Route
                        path="/friends/list"
                        render={props =>
                            <Friends
                                {...props}
                                setEdit={this.setEdit}
                                deleteFriend={this.deleteFriend}
                                friendsList={this.props.friendsReducers}
                            />
                        }
                    />
                    <Route
                        path={
                            (this.state.editMode)
                                ?
                                "/friends/edit-friend"
                                :
                                "/friends/add-friend"
                        }
                        render={props =>
                            <FriendForm
                                {...props}
                                addFriend={this.addFriend}
                                changeHandler={this.changeHandler}
                                editMode={this.state.editMode}
                                friendToEdit={this.state.friendToEdit}
                                updateFriend={this.updateFriend}
                                {...this.state.form}
                            />
                        }
                    />
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friendsReducers: state.friendsReducers.friends,
    }
}

export default connect(mapStateToProps, { fetchFriends })(App);