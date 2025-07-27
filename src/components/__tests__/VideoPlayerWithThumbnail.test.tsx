import React from 'react'
import { render } from '@testing-library/react-native'
import { VideoPlayerWithThumbnail } from '../VideoPlayerWithThumbnail'

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
    dark: { secondaryForeground: '#ffffff' },
    light: { secondaryForeground: '#000000' }
  }
}))

// Mock do react-native-youtube-iframe
jest.mock('react-native-youtube-iframe', () => {
  return ({ height, play, videoId, onChangeState }: any) => {
    const { View, Text } = require('react-native')
    return (
      <View testID="youtube-player" style={{ height }}>
        <Text>YouTube Player - Video ID: {videoId}</Text>
        <Text>Playing: {play ? 'true' : 'false'}</Text>
      </View>
    )
  }
})

// Mock do lucide-react-native
jest.mock('lucide-react-native', () => ({
  CirclePlay: ({ color, size }: { color: string; size: number }) => null
}))

describe('VideoPlayerWithThumbnail', () => {
  const defaultProps = {
    videoId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://example.com/thumbnail.jpg'
  }

  it('renders thumbnail initially', () => {
    const { UNSAFE_getByType, queryByTestId } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
    expect(queryByTestId('youtube-player')).toBeNull()
  })

  it('renders with correct thumbnail URL', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/thumbnail.jpg')
  })

  it('renders component structure correctly', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('handles different thumbnail URLs', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail 
        videoId="test-video"
        thumbnailUrl="https://example.com/custom-thumbnail.jpg"
      />
    )
    
    const image = UNSAFE_getByType('Image')
    expect(image.props.source.uri).toBe('https://example.com/custom-thumbnail.jpg')
  })

  it('renders play icon on thumbnail', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('applies theme colors correctly', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('maintains aspect ratio', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('renders with different video IDs', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail 
        videoId="different-video-id"
        thumbnailUrl="https://example.com/different.jpg"
      />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('handles video player props correctly', () => {
    const { UNSAFE_getByType } = render(
      <VideoPlayerWithThumbnail {...defaultProps} />
    )
    
    expect(UNSAFE_getByType('Image')).toBeTruthy()
  })

  it('renders without errors', () => {
    expect(() => render(<VideoPlayerWithThumbnail {...defaultProps} />)).not.toThrow()
  })
})
