import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Blog title of a test case',
  author: 'Test Case Author',
  url: 'testcaseurl.com',
  likes: 14,
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}

const user = {
  name: 'Test User',
  username: 'testuser'
}

describe('initially', () => {
  
  test('renders title', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )

    expect(component.container).toHaveTextContent(
      'Blog title of a test case'
    )
  })
  
  test('renders author', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )

    expect(component.container).toHaveTextContent(
      'Test Case Author'
    )
  })
  
  test('does not render url', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    expect(component.container).not.toHaveTextContent(
      'testcaseurl.com'
    )
  })
  
  test('does not render likes', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    expect(component.container).not.toHaveTextContent(
      '14'
    )
  })
})

describe('clicking the view button', () => {
  beforeEach(() => {
  })

  test('still renders title', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent(
      'Blog title of a test case'
    )
  })
  
  test('still renders author', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent(
      'Test Case Author'
    )
  })

  test('renders url', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('testcaseurl.com')
  })
  
  test('renders likes', () => {
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
      />
    )
    
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('14')
  })
})

describe('clicking the like button', () => {
  test('twice calls event handler twice', () => {
    const mockUpdate = jest.fn()
    
    const component = render(
      <Blog 
        blog={ blog }
        user={ user }
        updateBlog={ mockUpdate }
      />
    )
    
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
  })
})