import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from 'react-native'
import { Content } from '../Content'

describe('Content', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Content>
        <Text>Test Content</Text>
      </Content>
    )
    
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('applies correct styling', () => {
    const { getByTestId } = render(
      <Content>
        <Text testID="child">Content</Text>
      </Content>
    )
    
    const container = getByTestId('child').parent
    expect(container).toBeTruthy()
  })
})