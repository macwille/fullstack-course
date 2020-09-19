import React, { useState } from 'react'

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
            ulr: newUrl
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

export default BlogForm