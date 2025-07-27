import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')
  Reanimated.default.call = () => {}
  return Reanimated
})

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

// Suppress act warnings for animations
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: An update to Animated') ||
       args[0].includes('act(...)') ||
       args[0].includes('wrapped in act'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

global.__reanimatedWorkletInit = jest.fn()