import React from 'react'

const Phonebook = (props) => {

    return (
        <div>
            <h1>Phonebook</h1>
            <h3>Add a new person</h3>
            <form onSubmit={props.addPerson}>
                Name:
        <input
                    value={props.newPerson}
                    onChange={props.handlePersonChange}
                />
                <br></br>
        Number:
        <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}
                />
                <br></br>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Phonebook