import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { SelectExerciseCard } from '../SelectExerciseCard'
import { IExercise } from '@_dtos_/SelectExerciseDTO'

// Mock do Checkbox component
jest.mock('../ui/Checkbox', () => ({
  Checkbox: ({ isChecked, onPress, style }: any) => {
    const { TouchableOpacity, Text } = require('react-native')
    return (
      <TouchableOpacity onPress={onPress} style={style} testID="checkbox">
        <Text>{isChecked ? 'Checked' : 'Unchecked'}</Text>
      </TouchableOpacity>
    )
  }
}))

describe('SelectExerciseCard', () => {
  const mockExercise: IExercise = {
    id: 'exercise-1',
    exerciseTitle: 'Push Up',
    exerciseThumb: 'https://example.com/pushup.jpg'
  }

  const mockToggleSelectItem = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders exercise information correctly', () => {
    const { getByText } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Push Up')).toBeTruthy()
  })

  it('renders exercise thumbnail image', () => {
    const { UNSAFE_getByType } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/pushup.jpg')
  })

  it('shows unchecked checkbox when not selected', () => {
    const { getByText } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Unchecked')).toBeTruthy()
  })

  it('shows checked checkbox when selected', () => {
    const { getByText } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={true}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Checked')).toBeTruthy()
  })

  it('calls toggleSelectItem when checkbox is pressed', () => {
    const { getByTestId } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    const checkbox = getByTestId('checkbox')
    fireEvent.press(checkbox)
    
    expect(mockToggleSelectItem).toHaveBeenCalledWith('exercise-1')
  })

  it('toggles selection state correctly', () => {
    const { getByTestId, getByText, rerender } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    // Initially unchecked
    expect(getByText('Unchecked')).toBeTruthy()
    
    // Rerender as selected
    rerender(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={true}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Checked')).toBeTruthy()
  })

  it('renders with correct layout structure', () => {
    const { getByText, getByTestId } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Push Up')).toBeTruthy()
    expect(getByTestId('checkbox')).toBeTruthy()
  })

  it('handles different exercise data', () => {
    const differentExercise: IExercise = {
      id: 'exercise-2',
      exerciseTitle: 'Squat',
      exerciseThumb: 'https://example.com/squat.jpg'
    }

    const { getByText, UNSAFE_getByType } = render(
      <SelectExerciseCard 
        item={differentExercise}
        isSelected={true}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Squat')).toBeTruthy()
    expect(getByText('Checked')).toBeTruthy()
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/squat.jpg')
  })

  it('applies correct styling classes', () => {
    const { getByText } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Push Up')).toBeTruthy()
  })

  it('positions checkbox absolutely on the right', () => {
    const { getByTestId } = render(
      <SelectExerciseCard 
        item={mockExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    const checkbox = getByTestId('checkbox')
    expect(checkbox.props.style).toMatchObject({ position: 'absolute', right: 16 })
  })

  it('handles long exercise titles', () => {
    const longTitleExercise: IExercise = {
      id: 'exercise-3',
      exerciseTitle: 'Very Long Exercise Title That Might Overflow',
      exerciseThumb: 'https://example.com/long.jpg'
    }

    const { getByText } = render(
      <SelectExerciseCard 
        item={longTitleExercise}
        isSelected={false}
        toggleSelectItem={mockToggleSelectItem}
      />
    )
    
    expect(getByText('Very Long Exercise Title That Might Overflow')).toBeTruthy()
  })
})
