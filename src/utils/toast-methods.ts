import Toast from 'react-native-toast-message'

export const toast = {
  success: (message: string) =>
    Toast.show({
      type: 'success',
      text1: message,
    }),
  warning: (message: string) =>
    Toast.show({
      type: 'info',
      text1: message,
    }),
  error: (message: string) =>
    Toast.show({
      type: 'error',
      text1: message,
    }),
} as const
