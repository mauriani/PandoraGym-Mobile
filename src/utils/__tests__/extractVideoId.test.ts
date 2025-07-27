import { extractVideoId, getYoutubeThumbnail } from '../extractVideoId'

describe('extractVideoId utils', () => {
  describe('extractVideoId', () => {
    it('extracts video ID from standard YouTube URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from URL with additional parameters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&list=PLrAXtmRdnEQy'
      expect(extractVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from URL with v parameter in middle', () => {
      const url = 'https://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ'
      expect(extractVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('returns null for invalid URL', () => {
      const url = 'https://www.youtube.com/watch?invalid=dQw4w9WgXcQ'
      expect(extractVideoId(url)).toBeNull()
    })

    it('returns null for URL without v parameter', () => {
      const url = 'https://www.youtube.com/watch'
      expect(extractVideoId(url)).toBeNull()
    })

    it('handles empty string', () => {
      expect(extractVideoId('')).toBeNull()
    })

    it('handles malformed URLs', () => {
      expect(extractVideoId('not-a-url')).toBeNull()
      expect(extractVideoId('https://example.com')).toBeNull()
    })
  })

  describe('getYoutubeThumbnail', () => {
    // Mock console.error to avoid noise in tests
    const originalConsoleError = console.error
    beforeEach(() => {
      console.error = jest.fn()
    })
    afterEach(() => {
      console.error = originalConsoleError
    })

    it('generates thumbnail URL for standard YouTube URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('generates thumbnail URL for youtu.be short URL', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('generates thumbnail URL for embed URL', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('generates thumbnail URL for URL without protocol', () => {
      const url = 'www.youtube.com/watch?v=dQw4w9WgXcQ'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('generates thumbnail URL for URL without www', () => {
      const url = 'https://youtube.com/watch?v=dQw4w9WgXcQ'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('handles URL with additional parameters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&list=PLrAXtmRdnEQy'
      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      expect(getYoutubeThumbnail(url)).toBe(expected)
    })

    it('returns null for invalid input type', () => {
      expect(getYoutubeThumbnail(null)).toBeNull()
      expect(getYoutubeThumbnail(undefined)).toBeNull()
      expect(getYoutubeThumbnail(123)).toBeNull()
      expect(getYoutubeThumbnail({})).toBeNull()
      expect(console.error).toHaveBeenCalledWith('Invalid input: videoUrl should be a string')
    })

    it('returns null for invalid YouTube URL', () => {
      expect(getYoutubeThumbnail('https://example.com')).toBeNull()
      expect(getYoutubeThumbnail('not-a-url')).toBeNull()
      expect(getYoutubeThumbnail('')).toBeNull()
      expect(console.error).toHaveBeenCalledWith('Invalid YouTube URL')
    })

    it('handles various YouTube URL formats', () => {
      const urls = [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
        'https://youtube.com/watch?v=dQw4w9WgXcQ',
        'https://www.youtube.com/v/dQw4w9WgXcQ',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'https://youtu.be/dQw4w9WgXcQ'
      ]

      const expected = 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      
      urls.forEach(url => {
        expect(getYoutubeThumbnail(url)).toBe(expected)
      })
    })

    it('validates video ID format (11 characters)', () => {
      const validUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // 11 chars
      const invalidUrl = 'https://www.youtube.com/watch?v=short' // too short
      
      expect(getYoutubeThumbnail(validUrl)).toBeTruthy()
      expect(getYoutubeThumbnail(invalidUrl)).toBeNull()
    })
  })
})
