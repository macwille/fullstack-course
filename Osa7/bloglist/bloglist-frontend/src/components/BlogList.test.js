import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogList from './BlogList'

const blogs = [
  {
    title: "purple",
    author: "minivan",
    url: 'url',
    likes: 7,
    id: 111
  },
]

test('clicking the buttons calls event handler once', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <BlogList blogs={blogs} addLike={mockHandler} handleDelete={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  const button2 = component.getByText('delete')
  fireEvent.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Toggle shows url and likes', async () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogList blogs={blogs} addLike={mockHandler} handleDelete={mockHandler} />

  )
  const div = component.container.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).not.toHaveStyle('display: none')

  expect(component.container).toHaveTextContent(
    'Blogs purple minivanview url (likes: 7) likedeleteclose'
  )

})

test('clicking  like twice calls event handler twice', async () => {

  const mockHandler = jest.fn()
  const mockHandler1 = jest.fn()


  const component = render(
    <BlogList blogs={blogs} addLike={mockHandler} handleDelete={mockHandler1} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(mockHandler1.mock.calls).toHaveLength(0)
})