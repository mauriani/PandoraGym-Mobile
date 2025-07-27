import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { ButtonWithIcon } from '../ButtonWithIcon'

jest.mock('../IconComponent', () => ({
  IconComponent: () => null
}))

describe('ButtonWithIcon', () => {
  it('renders title correctly', () => {
    const { getByText } = render(
      <ButtonWithIcon title="Test Button" iconName="Calendar" />
    )
    expect(getByText('Test Button')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <ButtonWithIcon title="Press me" iconName="Plus" onPress={onPress} />
    )
    
    fireEvent.press(getByText('Press me'))
    expect(onPress).toHaveBeenCalled()
  })
})