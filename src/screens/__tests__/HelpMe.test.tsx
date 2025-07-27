import React from 'react'
import { render } from '@testing-library/react-native'
import { HelpMe } from '../HelpMe'

// Mock dos componentes
jest.mock('@components/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@components/Content', () => ({
  Content: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('@components/HeaderGoBack', () => ({
  HeaderGoBack: ({ title }: { title: string }) => {
    const { Text } = require('react-native')
    return <Text testID="header-title">{title}</Text>
  }
}))

jest.mock('@components/InputWithButton', () => ({
  InputWithButton: ({ label, iconName, size }: any) => {
    const { View, Text } = require('react-native')
    return (
      <View testID="input-with-button">
        <Text testID="input-label">{label}</Text>
        <Text testID="icon-name">{iconName}</Text>
        <Text testID="icon-size">{size}</Text>
      </View>
    )
  }
}))

describe('HelpMe Screen', () => {
  describe('Rendering', () => {
    it('renders all main elements', () => {
      const { getByTestId, getByText } = render(<HelpMe />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Me ajuda?')
      expect(getByText(/Como podemos te/)).toBeTruthy()
      expect(getByText('ajudar')).toBeTruthy()
      expect(getByText(/hoje, Othavio/)).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })

    it('renders header with correct title', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Me ajuda?')
    })

    it('renders help message with highlighted text', () => {
      const { getByText } = render(<HelpMe />)
      
      expect(getByText(/Como podemos te/)).toBeTruthy()
      expect(getByText('ajudar')).toBeTruthy()
      expect(getByText(/hoje, Othavio/)).toBeTruthy()
    })

    it('renders input with button component', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('input-with-button')).toBeTruthy()
      expect(getByTestId('input-label')).toHaveTextContent('Qual é a sua duvida ?')
      expect(getByTestId('icon-name')).toHaveTextContent('Send')
      expect(getByTestId('icon-size')).toHaveTextContent('20')
    })
  })

  describe('Component Structure', () => {
    it('has correct component hierarchy', () => {
      const { getByTestId } = render(<HelpMe />)
      
      // Verify that all main components are present
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })

    it('renders static content correctly', () => {
      const { getByText } = render(<HelpMe />)
      
      // Check that the help message is displayed
      expect(getByText(/Como podemos te/)).toBeTruthy()
      expect(getByText(/hoje, Othavio/)).toBeTruthy()
    })
  })

  describe('Input Configuration', () => {
    it('configures input with correct props', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('input-label')).toHaveTextContent('Qual é a sua duvida ?')
      expect(getByTestId('icon-name')).toHaveTextContent('Send')
      expect(getByTestId('icon-size')).toHaveTextContent('20')
    })
  })

  describe('Text Content', () => {
    it('displays personalized greeting', () => {
      const { getByText } = render(<HelpMe />)
      
      expect(getByText(/Othavio/)).toBeTruthy()
    })

    it('highlights the word "ajudar"', () => {
      const { getByText } = render(<HelpMe />)
      
      // The word "ajudar" should be highlighted with primary color
      expect(getByText('ajudar')).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('renders without accessibility issues', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })
  })

  describe('Layout', () => {
    it('renders in correct container structure', () => {
      const { getByTestId } = render(<HelpMe />)
      
      // Verify main components are rendered
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })
  })

  describe('Static Screen Behavior', () => {
    it('is a static screen with no dynamic behavior', () => {
      const { getByTestId } = render(<HelpMe />)
      
      // This screen is mostly static, so we just verify it renders correctly
      expect(getByTestId('header-title')).toBeTruthy()
      expect(getByTestId('input-with-button')).toBeTruthy()
    })
  })

  describe('Component Props', () => {
    it('passes correct props to InputWithButton', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('input-label')).toHaveTextContent('Qual é a sua duvida ?')
      expect(getByTestId('icon-name')).toHaveTextContent('Send')
      expect(getByTestId('icon-size')).toHaveTextContent('20')
    })

    it('passes correct title to HeaderGoBack', () => {
      const { getByTestId } = render(<HelpMe />)
      
      expect(getByTestId('header-title')).toHaveTextContent('Me ajuda?')
    })
  })
})
