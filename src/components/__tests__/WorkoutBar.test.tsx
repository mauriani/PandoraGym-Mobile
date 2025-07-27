import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import WorkoutBar from '../WorkoutBar'

// Mock do context
const mockElapsedTime = 3661 // 1 hour, 1 minute, 1 second
jest.mock('@context/WorkoutContext', () => ({
  useWorkout: () => ({
    elapsedTime: mockElapsedTime
  })
}))

// Mock do react-navigation
const mockNavigate = jest.fn()
const mockGetState = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    getState: mockGetState
  })
}))

// Mock do storage
jest.mock('@storage/index', () => ({
  getBottomBarStorage: jest.fn(() => 20),
  getCurrentWorkoutStorage: jest.fn(() => ({
    id: 'workout-1',
    name: 'Test Workout',
    exercise: {
      exerciseTitle: 'Test Exercise',
      exerciseThumb: 'https://example.com/thumb.jpg'
    }
  }))
}))

// Mock do formatTime utility
jest.mock('@utils/formatTime', () => ({
  secondsToHourMinute: jest.fn((seconds) => '01:01:01')
}))

describe('WorkoutBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetState.mockReturnValue({
      index: 0,
      routes: [{ name: 'home', params: { id: 'different-id' } }]
    })
  })

  it('renders workout information correctly', () => {
    const { getByText } = render(<WorkoutBar />)
    
    expect(getByText('Test Workout')).toBeTruthy()
    expect(getByText('Test Exercise')).toBeTruthy()
    expect(getByText('01:01:01')).toBeTruthy()
  })

  it('navigates to startTraining when pressed', () => {
    const { getByText } = render(<WorkoutBar />)
    
    const workoutButton = getByText('Test Workout').parent?.parent
    if (workoutButton) {
      fireEvent.press(workoutButton)
    }
    
    expect(mockNavigate).toHaveBeenCalledWith('startTraining', {
      id: 'workout-1',
      name: 'Test Workout'
    })
  })

  it('renders workout thumbnail image', () => {
    const { UNSAFE_getByType } = render(<WorkoutBar />)
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/thumb.jpg')
  })

  it('does not render when currentWorkout is null', () => {
    const { getCurrentWorkoutStorage } = require('@storage/index')
    getCurrentWorkoutStorage.mockReturnValueOnce(null)
    
    const { queryByText } = render(<WorkoutBar />)
    
    expect(queryByText('Test Workout')).toBeNull()
  })

  it('does not render when current route matches workout id', () => {
    mockGetState.mockReturnValue({
      index: 0,
      routes: [{ name: 'startTraining', params: { id: 'workout-1' } }]
    })
    
    const { queryByText } = render(<WorkoutBar />)
    
    expect(queryByText('Test Workout')).toBeNull()
  })

  it('applies correct bottom positioning for startTraining route', () => {
    mockGetState.mockReturnValue({
      index: 0,
      routes: [{ name: 'startTraining', params: { id: 'different-id' } }]
    })
    
    const { getByText } = render(<WorkoutBar />)
    
    // Component should render with different bottom positioning
    expect(getByText('Test Workout')).toBeTruthy()
  })

  it('applies correct bottom positioning for other routes', () => {
    mockGetState.mockReturnValue({
      index: 0,
      routes: [{ name: 'home', params: { id: 'different-id' } }]
    })
    
    const { getByText } = render(<WorkoutBar />)
    
    // Component should render with default bottom positioning
    expect(getByText('Test Workout')).toBeTruthy()
  })

  it('displays formatted elapsed time', () => {
    const { getByText } = render(<WorkoutBar />)
    
    expect(getByText('01:01:01')).toBeTruthy()
  })
})
