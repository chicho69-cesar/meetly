import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import MeetlyApp from './app'

describe('Meetly App', () => {
  test('Should render the Meetly App successfully', () => {
    const { container } = render(<MeetlyApp />)
    expect(container).toMatchSnapshot()
  })
})
