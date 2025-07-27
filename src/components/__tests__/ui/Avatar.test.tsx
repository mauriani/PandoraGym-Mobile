import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Image } from 'react-native'
import { Avatar, AvatarImage, AvatarFallback, AvatarEditButton, AvatarWithEdit } from '../../ui/Avatar'

jest.mock('../../IconComponent', () => ({
  IconComponent: ({ iconName }: { iconName: string }) => `Icon-${iconName}`
}))

describe('Avatar Components', () => {
  describe('Avatar', () => {
    it('renders correctly', () => {
      const { getByTestId } = render(<Avatar testID="avatar" />)
      expect(getByTestId('avatar')).toBeTruthy()
    })
  })

  describe('AvatarImage', () => {
    it('renders image with source', () => {
      const { UNSAFE_getByType } = render(
        <AvatarImage source={{ uri: 'test-image.jpg' }} />
      )
      expect(UNSAFE_getByType(Image)).toBeTruthy()
    })
  })

  describe('AvatarFallback', () => {
    it('renders fallback text', () => {
      const { getByText } = render(
        <AvatarFallback>AB</AvatarFallback>
      )
      expect(getByText('AB')).toBeTruthy()
    })
  })

  describe('AvatarEditButton', () => {
    it('calls onEditPress when pressed', () => {
      const onEditPress = jest.fn()
      const { getByTestId } = render(
        <AvatarEditButton onEditPress={onEditPress} />
      )
      
      fireEvent.press(getByTestId('avatar-edit-button'))
      expect(onEditPress).toHaveBeenCalled()
    })
  })

  describe('AvatarWithEdit', () => {
    it('renders with image and edit button', () => {
      const onEditPress = jest.fn()
      const { UNSAFE_getByType, getByTestId } = render(
        <AvatarWithEdit imageUrl="test.jpg" onEditPress={onEditPress} />
      )
      
      expect(UNSAFE_getByType(Image)).toBeTruthy()
      expect(getByTestId('avatar-edit-button')).toBeTruthy()
    })

    it('renders fallback when no image', () => {
      const onEditPress = jest.fn()
      const { getByText, getByTestId } = render(
        <AvatarWithEdit imageUrl={null} onEditPress={onEditPress} />
      )
      
      expect(getByText('AB')).toBeTruthy()
      expect(getByTestId('avatar-edit-button')).toBeTruthy()
    })
  })
})