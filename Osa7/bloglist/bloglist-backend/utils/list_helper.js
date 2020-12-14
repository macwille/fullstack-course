const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}
const favouriteBlog = (blogs) => {
    const favourite = blogs.reduce(function (prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
    return favourite
}
const mostBlogs = (blogs) => {
    return 1
}


module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}