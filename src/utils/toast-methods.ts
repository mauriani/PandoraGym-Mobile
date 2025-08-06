import Toast from 'react-native-toast-message'

interface ToastOptions {
  onDismiss?: () => void
}

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    Toast.show({
      type: 'success',
      text1: message,
      onHide: options?.onDismiss,
    }),
  warning: (message: string, options?: ToastOptions) =>
    Toast.show({
      type: 'info',
      text1: message,
      onHide: options?.onDismiss,
    }),
  error: (message: string, options?: ToastOptions) =>
    Toast.show({
      type: 'error',
      text1: message,
      onHide: options?.onDismiss,
    }),
} as const
