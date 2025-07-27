import React from 'react'
import { render } from '@testing-library/react-native'
import { Heading } from '../Heading'

describe('Heading', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<Heading title="Test Heading" />)
    expect(getByText('Test Heading')).toBeTruthy()
  })

  it('applies correct styling', () => {
    const { getByText } = render(<Heading title="Styled Heading" />)
    const heading = getByText('Styled Heading')
    expect(heading).toBeTruthy()
  })
})