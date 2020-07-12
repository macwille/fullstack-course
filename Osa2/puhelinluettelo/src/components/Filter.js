import React from 'react'

const Filter = (props) => {

    return (
        <div>
            Filter:
            <input
                value={props.currentFilter}
                onChange={props.handleFilterChange}

            />
            <p>Found {props.personsToShow.length} contacts</p>
        </div>
    )

}

export default Filter