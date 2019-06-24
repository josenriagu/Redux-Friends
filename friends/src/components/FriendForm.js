import React from 'react';

const FriendForm = props => {
    const { editMode, changeHandler, addFriend, name, email, age, friendToEdit, updateFriend } = props;

    const style = { display: (name !== "" && age !== "" && age !== 0 && email !== "") ? "initial" : "none" }
    return (
        <div className="friendform-wrapper">
            {
                (editMode)
                    ?
                    <h4>Edit Buddy</h4>
                    :
                    <h4>Create Buddy</h4>
            }
            <form className="form">
                <div className="field">
                    <span>Name: </span>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => changeHandler(event)}
                        name="name"
                        placeholder="enter buddy's name"
                        required
                    />
                </div>
                <div className="field">
                    <span>Age: </span>
                    <input
                        type="number"
                        min="1"
                        value={age}
                        onChange={(event) => changeHandler(event)}
                        name="age"
                        placeholder="enter buddy's age"
                        required
                    />
                </div>
                <div className="field">
                    <span>Email: </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => changeHandler(event)}
                        name="email"
                        placeholder="enter buddy's email"
                        required
                    />
                </div>
                {
                    (editMode)
                        ?
                        <button
                            style={style}
                            type="submit"
                            onClick={(event) => updateFriend(event, friendToEdit.id)}
                        >Update</button>
                        :
                        <button
                            style={style}
                            type="submit"
                            onClick={(event) => addFriend(event)}
                        >Create</button>
                }
            </form>
        </div>
    );
}

export default FriendForm;