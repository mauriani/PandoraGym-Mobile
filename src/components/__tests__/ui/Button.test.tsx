import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text, ActivityIndicator } from 'react-native'
import { Button } from '../../ui/Button'

describe('Button', () => {
  it('renders with label', () => {
    const { getByText } = render(<Button label="Test Button" />)
    expect(getByText('Test Button')).toBeTruthy()
  })

  it('renders with children', () => {
    const { getByText } = render(
      <Button>
        <Text>Child Content</Text>
      </Button>,
    )
    expect(getByText('Child Content')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button label="Press me" onPress={onPress} />)

    fireEvent.press(getByText('Press me'))
    expect(onPress).toHaveBeenCalled()
  })

  it('shows loading indicator when loading', () => {
    const { UNSAFE_getByType } = render(<Button label="Test" loading />)
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy()
  })

  it('is disabled when loading', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button testID="test-button" label="Test" loading onPress={onPress} />,
    )

    const button = getByTestId('test-button')
    expect(button.props.accessibilityState.disabled).toBe(true)
  })
})
