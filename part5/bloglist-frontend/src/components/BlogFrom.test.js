import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import Blog from './Blog'

test('<BlogForm /> updates parent state and calls event handler with correct data', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={ createBlog } />
  )

  const titleInput = component.container.querySelector('#titleInput')
  const authorInput = component.container.querySelector('#authorInput')
  const urlInput = component.container.querySelector('#urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing forms could be easier'}
  })
  fireEvent.change(authorInput, {
    target: { value: 'Form Tester' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'formtester.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Form Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('formtester.com')
})