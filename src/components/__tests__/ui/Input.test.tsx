import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Input } from '../../ui/Input'

describe('Input', () => {
  it('renders with label as placeholder', () => {
    const { getByPlaceholderText } = render(<Input label="Test Input" />)
    expect(getByPlaceholderText('Test Input')).toBeTruthy()
  })

  it('renders with placeholder text', () => {
    const { getByText } = render(<Input placeholder="Enter text" />)
    expect(getByText('Enter text')).toBeTruthy()
  })

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn()
    const { getByPlaceholderText } = render(
      <Input label="Test" onChangeText={onChangeText} />
    )
    
    fireEvent.changeText(getByPlaceholderText('Test'), 'new text')
    expect(onChangeText).toHaveBeenCalledWith('new text')
  })
})