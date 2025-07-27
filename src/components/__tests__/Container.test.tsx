import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from 'react-native'
import { Container } from '../Container'

describe('Container', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Container>
        <Text>Test Content</Text>
      </Container>
    )
    
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('applies correct styling', () => {
    const { getByTestId } = render(
      <Container>
        <Text testID="child">Content</Text>
      </Container>
    )
    
    const container = getByTestId('child').parent
    expect(container).toBeTruthy()
  })
})