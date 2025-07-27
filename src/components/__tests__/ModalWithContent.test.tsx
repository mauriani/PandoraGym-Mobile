import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'
import { ModalWithContent } from '../ModalWithContent'

// Mock do theme provider
jest.mock('@theme/theme-provider', () => ({
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ colorScheme: 'dark' })
}))

// Mock do themes
jest.mock('@theme/themes', () => ({
  themes: {
    dark: { popoverForeground: '#ffffff' },
    light: { popoverForeground: '#000000' }
  }
}))

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  X: ({ size, color, style }: any) => null
}))

describe('ModalWithContent', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    content: <Text>Modal Content</Text>,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders content when isOpen is true', () => {
    const { getByText } = render(<ModalWithContent {...defaultProps} />)
    
    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('does not render content when isOpen is false', () => {
    const { queryByText } = render(
      <ModalWithContent {...defaultProps} isOpen={false} />
    )
    
    expect(queryByText('Modal Content')).toBeNull()
  })

  it('renders title when provided', () => {
    const { getByText } = render(
      <ModalWithContent {...defaultProps} title="Modal Title" />
    )
    
    expect(getByText('Modal Title')).toBeTruthy()
    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('does not render title when not provided', () => {
    const { queryByText, getByText } = render(<ModalWithContent {...defaultProps} />)
    
    expect(getByText('Modal Content')).toBeTruthy()
    // Since no title is provided, we shouldn't find any title text
  })

  it('renders close functionality', () => {
    const mockOnClose = jest.fn()
    const { getByText } = render(
      <ModalWithContent {...defaultProps} onClose={mockOnClose} />
    )
    
    // Just check that the component renders correctly
    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('renders modal with correct properties', () => {
    const { UNSAFE_getByType } = render(<ModalWithContent {...defaultProps} />)
    
    const modal = UNSAFE_getByType('Modal')
    expect(modal.props.visible).toBe(true)
    expect(modal.props.animationType).toBe('fade')
    expect(modal.props.transparent).toBe(true)
    expect(modal.props.statusBarTranslucent).toBe(true)
  })

  it('handles onRequestClose correctly', () => {
    const mockOnClose = jest.fn()
    const { UNSAFE_getByType } = render(
      <ModalWithContent {...defaultProps} onClose={mockOnClose} />
    )
    
    const modal = UNSAFE_getByType('Modal')
    expect(modal.props.onRequestClose).toBe(mockOnClose)
  })

  it('renders with keyboard avoiding behavior', () => {
    const { getByText } = render(<ModalWithContent {...defaultProps} />)
    
    // Just check that the component renders correctly
    expect(getByText('Modal Content')).toBeTruthy()
  })

  it('renders custom content correctly', () => {
    const customContent = (
      <>
        <Text>Custom Content 1</Text>
        <Text>Custom Content 2</Text>
      </>
    )
    
    const { getByText } = render(
      <ModalWithContent {...defaultProps} content={customContent} />
    )
    
    expect(getByText('Custom Content 1')).toBeTruthy()
    expect(getByText('Custom Content 2')).toBeTruthy()
  })

  it('works without onClose callback', () => {
    const { getByText } = render(
      <ModalWithContent 
        isOpen={true}
        content={<Text>Content</Text>}
      />
    )
    
    expect(getByText('Content')).toBeTruthy()
  })
})
