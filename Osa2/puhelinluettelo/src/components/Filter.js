import React from 'react'

const Filter = (props) => {

    return (
        <div>
            Filter:
            <input
                value={props.currentFilter}
                onChange={props.handleFilterChange}
            />
        </div>
    )
}

export default Filter