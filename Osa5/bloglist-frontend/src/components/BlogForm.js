import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setAuthor] = useState('')
    const [newUrl, setUrl] = useState('')


    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleURLchange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="formDiv">
            <form onSubmit={addBlog}>
                <h2>Add blog</h2>
                <div>
                    title:
                <input
                        value={newTitle}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                <input
                        value={newAuthor}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                <input
                        value={newUrl}
                        onChange={handleURLchange}
                    />
                </div>

                <button type="submit">create</button>
            </form>
        </div>
    )
}
BlogForm.propTypes = {
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleURLchange: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
}

export default BlogForm