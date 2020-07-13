import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'


test('renders title', () => {
  const blog = {
    title: 'Blog title of a test case',
    author: 'Test Case Author',
    url: 'testcaseurl.com',
    likes: 14
  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).toHaveTextContent(
    'Blog title of a test case'
  )
})

test('renders author', () => {
  const blog = {
    title: 'Blog title of a test case',
    author: 'Test Case Author',
    url: 'testcaseurl.com',
    likes: 14
  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).toHaveTextContent(
    'Test Case Author'
  )
})

test('does not render url', () => {
  const blog = {
    title: 'Blog title of a test case',
    author: 'Test Case Author',
    url: 'testcaseurl.com',
    likes: 14
  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).not.toHaveTextContent(
    'testcaseurl.com'
  )
})

test('does not render likes', () => {
  const blog = {
    title: 'Blog title of a test case',
    author: 'Test Case Author',
    url: 'testcaseurl.com',
    likes: 14
  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).not.toHaveTextContent(
    '14'
  )
})