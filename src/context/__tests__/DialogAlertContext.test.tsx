import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { renderHook, act } from '@testing-library/react-native'
import { DialogAlertProvider, useOpenDialogAlert } from '../DialogAlertContext'
import { Text, TouchableOpacity } from 'react-native'

// Mock do DialogAlert component
jest.mock('@components/DialogAlert', () => ({
  DialogAlert: ({ isOpen, title, message, close, onConfirm, isButtonCancel, isButtonTitleConfirm }: any) => {
    const { View, Text, TouchableOpacity } = require('react-native')
    
    if (!isOpen) return null
    
    return (
      <View testID="dialog-alert">
        <Text testID="dialog-title">{title}</Text>
        <Text testID="dialog-message">{message}</Text>
        
        {isButtonCancel && (
          <TouchableOpacity testID="cancel-button" onPress={close}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          testID="confirm-button" 
          onPress={() => {
            if (onConfirm) onConfirm()
            close()
          }}
        >
          <Text>{isButtonTitleConfirm || 'Confirm'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}))

describe('DialogAlertContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <DialogAlertProvider>{children}</DialogAlertProvider>
  )

  describe('useOpenDialogAlert hook', () => {
    it('provides context functions', () => {
      const { result } = renderHook(() => useOpenDialogAlert(), { wrapper })
      
      expect(result.current).toHaveProperty('openDialogAlert')
      expect(result.current).toHaveProperty('closeDialog')
      expect(typeof result.current?.openDialogAlert).toBe('function')
      expect(typeof result.current?.closeDialog).toBe('function')
    })

    it('returns undefined when used outside provider', () => {
      const { result } = renderHook(() => useOpenDialogAlert())
      
      expect(result.current).toBeUndefined()
    })
  })

  describe('DialogAlertProvider', () => {
    it('renders children correctly', () => {
      const TestChild = () => <Text testID="test-child">Test Child</Text>
      
      const { getByTestId } = render(
        <DialogAlertProvider>
          <TestChild />
        </DialogAlertProvider>
      )
      
      expect(getByTestId('test-child')).toBeTruthy()
    })

    it('initially does not show dialog', () => {
      const { queryByTestId } = render(
        <DialogAlertProvider>
          <Text>Content</Text>
        </DialogAlertProvider>
      )
      
      expect(queryByTestId('dialog-alert')).toBeNull()
    })
  })

  describe('dialog functionality', () => {
    const TestComponent = () => {
      const dialogAlert = useOpenDialogAlert()
      
      return (
        <TouchableOpacity
          testID="open-dialog-button"
          onPress={() => dialogAlert?.openDialogAlert({
            title: 'Test Title',
            message: 'Test Message',
            isButtonCancel: true,
            isButtonTitleConfirm: 'Custom Confirm'
          })}
        >
          <Text>Open Dialog</Text>
        </TouchableOpacity>
      )
    }

    it('opens dialog with correct props', () => {
      const { getByTestId } = render(
        <DialogAlertProvider>
          <TestComponent />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      
      expect(getByTestId('dialog-alert')).toBeTruthy()
      expect(getByTestId('dialog-title')).toHaveTextContent('Test Title')
      expect(getByTestId('dialog-message')).toHaveTextContent('Test Message')
      expect(getByTestId('cancel-button')).toBeTruthy()
      expect(getByTestId('confirm-button')).toHaveTextContent('Custom Confirm')
    })

    it('closes dialog when cancel button is pressed', () => {
      const { getByTestId, queryByTestId } = render(
        <DialogAlertProvider>
          <TestComponent />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      expect(getByTestId('dialog-alert')).toBeTruthy()
      
      // Close dialog
      fireEvent.press(getByTestId('cancel-button'))
      expect(queryByTestId('dialog-alert')).toBeNull()
    })

    it('closes dialog when confirm button is pressed', () => {
      const { getByTestId, queryByTestId } = render(
        <DialogAlertProvider>
          <TestComponent />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      expect(getByTestId('dialog-alert')).toBeTruthy()
      
      // Confirm dialog
      fireEvent.press(getByTestId('confirm-button'))
      expect(queryByTestId('dialog-alert')).toBeNull()
    })

    it('calls onConfirm when confirm button is pressed', () => {
      const mockOnConfirm = jest.fn()
      
      const TestComponentWithConfirm = () => {
        const dialogAlert = useOpenDialogAlert()
        
        return (
          <TouchableOpacity
            testID="open-dialog-button"
            onPress={() => dialogAlert?.openDialogAlert({
              title: 'Test Title',
              message: 'Test Message',
              onConfirm: mockOnConfirm
            })}
          >
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        )
      }

      const { getByTestId } = render(
        <DialogAlertProvider>
          <TestComponentWithConfirm />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      
      // Confirm dialog
      fireEvent.press(getByTestId('confirm-button'))
      
      expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    })

    it('handles dialog without cancel button', () => {
      const TestComponentNoCancelButton = () => {
        const dialogAlert = useOpenDialogAlert()
        
        return (
          <TouchableOpacity
            testID="open-dialog-button"
            onPress={() => dialogAlert?.openDialogAlert({
              title: 'Test Title',
              message: 'Test Message',
              isButtonCancel: false
            })}
          >
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        )
      }

      const { getByTestId, queryByTestId } = render(
        <DialogAlertProvider>
          <TestComponentNoCancelButton />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      
      expect(getByTestId('dialog-alert')).toBeTruthy()
      expect(queryByTestId('cancel-button')).toBeNull()
      expect(getByTestId('confirm-button')).toBeTruthy()
    })

    it('uses default confirm button text when not provided', () => {
      const TestComponentDefaultConfirm = () => {
        const dialogAlert = useOpenDialogAlert()
        
        return (
          <TouchableOpacity
            testID="open-dialog-button"
            onPress={() => dialogAlert?.openDialogAlert({
              title: 'Test Title',
              message: 'Test Message'
            })}
          >
            <Text>Open Dialog</Text>
          </TouchableOpacity>
        )
      }

      const { getByTestId } = render(
        <DialogAlertProvider>
          <TestComponentDefaultConfirm />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      
      expect(getByTestId('confirm-button')).toHaveTextContent('Confirm')
    })
  })

  describe('multiple dialogs', () => {
    it('replaces previous dialog when opening new one', () => {
      const TestMultipleDialogs = () => {
        const dialogAlert = useOpenDialogAlert()
        
        return (
          <>
            <TouchableOpacity
              testID="open-first-dialog"
              onPress={() => dialogAlert?.openDialogAlert({
                title: 'First Title',
                message: 'First Message'
              })}
            >
              <Text>Open First Dialog</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              testID="open-second-dialog"
              onPress={() => dialogAlert?.openDialogAlert({
                title: 'Second Title',
                message: 'Second Message'
              })}
            >
              <Text>Open Second Dialog</Text>
            </TouchableOpacity>
          </>
        )
      }

      const { getByTestId } = render(
        <DialogAlertProvider>
          <TestMultipleDialogs />
        </DialogAlertProvider>
      )
      
      // Open first dialog
      fireEvent.press(getByTestId('open-first-dialog'))
      expect(getByTestId('dialog-title')).toHaveTextContent('First Title')
      
      // Open second dialog (should replace first)
      fireEvent.press(getByTestId('open-second-dialog'))
      expect(getByTestId('dialog-title')).toHaveTextContent('Second Title')
    })
  })

  describe('programmatic close', () => {
    it('can close dialog programmatically', () => {
      const TestProgrammaticClose = () => {
        const dialogAlert = useOpenDialogAlert()
        
        return (
          <>
            <TouchableOpacity
              testID="open-dialog-button"
              onPress={() => dialogAlert?.openDialogAlert({
                title: 'Test Title',
                message: 'Test Message'
              })}
            >
              <Text>Open Dialog</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              testID="close-dialog-button"
              onPress={() => dialogAlert?.closeDialog()}
            >
              <Text>Close Dialog</Text>
            </TouchableOpacity>
          </>
        )
      }

      const { getByTestId, queryByTestId } = render(
        <DialogAlertProvider>
          <TestProgrammaticClose />
        </DialogAlertProvider>
      )
      
      // Open dialog
      fireEvent.press(getByTestId('open-dialog-button'))
      expect(getByTestId('dialog-alert')).toBeTruthy()
      
      // Close dialog programmatically
      fireEvent.press(getByTestId('close-dialog-button'))
      expect(queryByTestId('dialog-alert')).toBeNull()
    })
  })
})
