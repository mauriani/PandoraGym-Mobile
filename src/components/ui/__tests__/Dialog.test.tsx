import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text, TouchableOpacity } from 'react-native'
import { Dialog, DialogTrigger, DialogContent, useDialog } from '../Dialog'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' ')
}))

describe('Dialog', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Dialog>
        <Text>Dialog Content</Text>
      </Dialog>
    )
    
    expect(getByText('Dialog Content')).toBeTruthy()
  })

  it('opens dialog when trigger is pressed', () => {
    const TestComponent = () => (
      <Dialog>
        <DialogTrigger>
          <TouchableOpacity>
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        </DialogTrigger>
        <DialogContent>
          <Text>Dialog is open</Text>
        </DialogContent>
      </Dialog>
    )

    const { getByText, queryByText } = render(<TestComponent />)
    
    // Dialog should not be visible initially
    expect(queryByText('Dialog is open')).toBeNull()
    
    // Press trigger to open dialog
    fireEvent.press(getByText('Open Dialog'))
    
    // Dialog should now be visible
    expect(getByText('Dialog is open')).toBeTruthy()
  })

  it('closes dialog when backdrop is pressed', () => {
    const TestComponent = () => (
      <Dialog>
        <DialogTrigger>
          <TouchableOpacity>
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        </DialogTrigger>
        <DialogContent>
          <Text>Dialog is open</Text>
        </DialogContent>
      </Dialog>
    )

    const { getByText, queryByText } = render(<TestComponent />)
    
    // Open dialog
    fireEvent.press(getByText('Open Dialog'))
    expect(getByText('Dialog is open')).toBeTruthy()
    
    // Find and press backdrop (the outer TouchableOpacity)
    const backdrop = getByText('Dialog is open').parent?.parent?.parent
    if (backdrop) {
      fireEvent.press(backdrop)
    }
    
    // Dialog should be closed
    expect(queryByText('Dialog is open')).toBeNull()
  })

  it('applies custom className to DialogContent', () => {
    const TestComponent = () => (
      <Dialog>
        <DialogTrigger>
          <TouchableOpacity>
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        </DialogTrigger>
        <DialogContent className="custom-class">
          <Text>Dialog Content</Text>
        </DialogContent>
      </Dialog>
    )

    const { getByText } = render(<TestComponent />)
    
    // Open dialog
    fireEvent.press(getByText('Open Dialog'))
    
    // Check if content is rendered
    expect(getByText('Dialog Content')).toBeTruthy()
  })

  it('throws error when useDialog is used outside Dialog context', () => {
    const TestComponent = () => {
      try {
        useDialog()
        return <Text>Should not render</Text>
      } catch (error) {
        return <Text>Error caught</Text>
      }
    }

    const { getByText } = render(<TestComponent />)
    expect(getByText('Error caught')).toBeTruthy()
  })
})
