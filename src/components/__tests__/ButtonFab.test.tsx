import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'

import { ButtonFab } from '../ButtonFab'

jest.mock('../IconComponent', () => ({
  IconComponent: ({ iconName }: { iconName: string }) => `Icon-${iconName}`,
}))

describe('ButtonFab', () => {
  it('renders with correct icon', () => {
    const { getByTestId } = render(
      <ButtonFab onSubmit={() => {}} iconName="Calendar" />,
    )
    expect(getByTestId('button-fab')).toBeTruthy()
  })

  it('calls onSubmit when pressed', () => {
    const onSubmit = jest.fn()
    const { getByTestId } = render(
      <ButtonFab onSubmit={onSubmit} iconName="Plus" />,
    )

    fireEvent.press(getByTestId('button-fab'))
    expect(onSubmit).toHaveBeenCalled()
  })

  it('has correct styling', () => {
    const { getByTestId } = render(
      <ButtonFab onSubmit={() => {}} iconName="Calendar" />,
    )

    const button = getByTestId('button-fab')
    expect(button.props.style).toMatchObject({
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
    })
  })
})
