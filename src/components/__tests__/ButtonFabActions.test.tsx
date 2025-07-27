import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import { ButtonFabActions } from '../ButtonFabActions'

jest.mock('../IconComponent', () => ({
  IconComponent: ({ iconName }: { iconName: string }) => `Icon-${iconName}`,
}))

describe('ButtonFabActions', () => {
  const mockActions = [
    { iconName: 'Calendar' as const, onPress: jest.fn() },
    { iconName: 'MessageCircleMore' as const, onPress: jest.fn() },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders main plus button', () => {
    const { getByTestId } = render(<ButtonFabActions actions={mockActions} />)
    expect(getByTestId('fab-main-button')).toBeTruthy()
  })

  it('shows actions when plus button is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <ButtonFabActions actions={mockActions} />,
    )

    expect(queryByTestId('fab-action-0')).toBeFalsy()

    act(() => {
      fireEvent.press(getByTestId('fab-main-button'))
    })
    expect(getByTestId('fab-action-0')).toBeTruthy()
    expect(getByTestId('fab-action-1')).toBeTruthy()
  })

  it('calls action onPress and closes menu', () => {
    const { getByTestId } = render(<ButtonFabActions actions={mockActions} />)

    act(() => {
      fireEvent.press(getByTestId('fab-main-button'))
    })
    act(() => {
      fireEvent.press(getByTestId('fab-action-0'))
    })

    expect(mockActions[0].onPress).toHaveBeenCalled()
  })

  it('toggles actions visibility', () => {
    const { getByTestId, queryByTestId } = render(
      <ButtonFabActions actions={mockActions} />,
    )

    act(() => {
      fireEvent.press(getByTestId('fab-main-button'))
    })
    expect(getByTestId('fab-action-0')).toBeTruthy()

    act(() => {
      fireEvent.press(getByTestId('fab-main-button'))
    })
    expect(queryByTestId('fab-action-0')).toBeFalsy()
  })
})
