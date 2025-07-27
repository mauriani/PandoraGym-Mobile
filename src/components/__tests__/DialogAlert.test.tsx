import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { DialogAlert } from '../DialogAlert'

describe('DialogAlert', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Test Title',
    message: 'Test message',
    onConfirm: jest.fn(),
    close: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title and message correctly', () => {
    const { getByText } = render(<DialogAlert {...defaultProps} />)
    
    expect(getByText('Test Title')).toBeTruthy()
    expect(getByText('Test message')).toBeTruthy()
  })

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <DialogAlert {...defaultProps} isOpen={false} />
    )
    
    expect(queryByText('Test Title')).toBeNull()
    expect(queryByText('Test message')).toBeNull()
  })

  it('renders confirm button with default text', () => {
    const { getByText } = render(<DialogAlert {...defaultProps} />)
    
    // Should render confirm button (text will be undefined/empty if no custom title)
    const confirmButton = getByText('').parent
    expect(confirmButton).toBeTruthy()
  })

  it('renders confirm button with custom title', () => {
    const { getByText } = render(
      <DialogAlert {...defaultProps} isButtonTitleConfirm="Custom Confirm" />
    )
    
    expect(getByText('Custom Confirm')).toBeTruthy()
  })

  it('renders cancel button when isButtonCancel is true', () => {
    const { getByText } = render(
      <DialogAlert {...defaultProps} isButtonCancel={true} />
    )
    
    expect(getByText('Cancelar')).toBeTruthy()
  })

  it('does not render cancel button when isButtonCancel is false', () => {
    const { queryByText } = render(
      <DialogAlert {...defaultProps} isButtonCancel={false} />
    )
    
    expect(queryByText('Cancelar')).toBeNull()
  })

  it('calls close when cancel button is pressed', () => {
    const mockClose = jest.fn()
    const { getByText } = render(
      <DialogAlert 
        {...defaultProps} 
        isButtonCancel={true}
        close={mockClose}
      />
    )
    
    fireEvent.press(getByText('Cancelar'))
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('calls onConfirm and close when confirm button is pressed', () => {
    const mockOnConfirm = jest.fn()
    const mockClose = jest.fn()
    const { getByText } = render(
      <DialogAlert 
        {...defaultProps}
        isButtonTitleConfirm="Confirm"
        onConfirm={mockOnConfirm}
        close={mockClose}
      />
    )
    
    fireEvent.press(getByText('Confirm'))
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('handles async onConfirm function', async () => {
    const mockOnConfirm = jest.fn().mockResolvedValue(true)
    const mockClose = jest.fn()
    const { getByText } = render(
      <DialogAlert 
        {...defaultProps}
        isButtonTitleConfirm="Confirm"
        onConfirm={mockOnConfirm}
        close={mockClose}
      />
    )
    
    fireEvent.press(getByText('Confirm'))
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('renders modal with correct properties', () => {
    const { UNSAFE_getByType } = render(<DialogAlert {...defaultProps} />)
    
    const modal = UNSAFE_getByType('Modal')
    expect(modal.props.visible).toBe(true)
    expect(modal.props.animationType).toBe('fade')
    expect(modal.props.transparent).toBe(true)
    expect(modal.props.statusBarTranslucent).toBe(true)
  })
})
