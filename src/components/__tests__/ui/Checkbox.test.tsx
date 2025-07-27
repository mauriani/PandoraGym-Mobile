import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Checkbox } from '../../ui/Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Checkbox label="Test Checkbox" isChecked={false} onPress={() => {}} />
    )
    expect(getByText('Test Checkbox')).toBeTruthy()
  })

  it('shows checkmark when checked', () => {
    const { getByText } = render(
      <Checkbox label="Checked" isChecked={true} onPress={() => {}} />
    )
    expect(getByText('✓')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Checkbox label="Press me" isChecked={false} onPress={onPress} />
    )
    
    fireEvent.press(getByText('Press me').parent.parent.children[0])
    expect(onPress).toHaveBeenCalled()
  })
})