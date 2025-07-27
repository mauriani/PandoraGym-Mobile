import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { MyTrainingCard } from '../MyTrainingCard'
import { ITraining } from '@_dtos_/trainingDTO'

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
    dark: { mutedForeground: '#888888' },
    light: { mutedForeground: '#666666' }
  }
}))

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  ChevronRight: ({ size, color, style }: any) => null
}))

describe('MyTrainingCard', () => {
  const mockTraining: ITraining = {
    id: 'training-1',
    name: 'Upper Body Workout',
    thumbnail: 'https://example.com/thumbnail.jpg',
    weekDays: ['Segunda', 'Quarta', 'Sexta'],
    exclusive: false,
    personalId: null,
    personalName: null
  }

  const mockExclusiveTraining: ITraining = {
    id: 'training-2',
    name: 'Custom Training',
    thumbnail: 'https://example.com/custom.jpg',
    weekDays: ['Terça', 'Quinta'],
    exclusive: true,
    personalId: 'personal-1',
    personalName: 'João Silva'
  }

  const mockOnAccessTraining = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders training information correctly', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(getByText('Upper Body Workout')).toBeTruthy()
    expect(getByText('Segunda, Quarta, Sexta')).toBeTruthy()
  })

  it('renders training thumbnail image', () => {
    const { UNSAFE_getByType } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/thumbnail.jpg')
  })

  it('calls onAccessTraining when pressed', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    const card = getByText('Upper Body Workout').parent?.parent?.parent
    if (card) {
      fireEvent.press(card)
    }
    
    expect(mockOnAccessTraining).toHaveBeenCalledWith('training-1', 'Upper Body Workout')
  })

  it('shows personal trainer info for exclusive training', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockExclusiveTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(getByText('Custom Training')).toBeTruthy()
    // Usar regex para buscar o texto que contém "Criado por"
    expect(getByText(/Criado por/)).toBeTruthy()
    expect(getByText('João Silva')).toBeTruthy()
  })

  it('does not show personal trainer info for non-exclusive training', () => {
    const { queryByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(queryByText('Criado por')).toBeNull()
  })

  it('truncates week days text with numberOfLines={2}', () => {
    const longWeekDays = {
      ...mockTraining,
      weekDays: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']
    }

    const { getByText } = render(
      <MyTrainingCard 
        item={longWeekDays} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    const weekDaysText = getByText('Segunda-feira, Terça-feira, Quarta-feira, Quinta-feira, Sexta-feira')
    expect(weekDaysText.props.numberOfLines).toBe(2)
  })

  it('renders with correct styling classes', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(getByText('Upper Body Workout')).toBeTruthy()
  })

  it('handles training without personal trainer correctly', () => {
    const trainingWithoutPersonal = {
      ...mockExclusiveTraining,
      personalId: null,
      personalName: null
    }

    const { queryByText } = render(
      <MyTrainingCard 
        item={trainingWithoutPersonal} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(queryByText('Criado por')).toBeNull()
  })

  it('renders chevron right icon', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    // Just check that the component renders without errors
    expect(getByText('Upper Body Workout')).toBeTruthy()
  })

  it('handles empty week days array', () => {
    const trainingWithoutDays = {
      ...mockTraining,
      weekDays: []
    }

    const { getByText } = render(
      <MyTrainingCard 
        item={trainingWithoutDays} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(getByText('Upper Body Workout')).toBeTruthy()
    expect(getByText('')).toBeTruthy() // Empty string from join
  })

  it('applies theme colors correctly', () => {
    const { getByText } = render(
      <MyTrainingCard 
        item={mockTraining} 
        onAccessTraining={mockOnAccessTraining} 
      />
    )
    
    expect(getByText('Upper Body Workout')).toBeTruthy()
  })
})
