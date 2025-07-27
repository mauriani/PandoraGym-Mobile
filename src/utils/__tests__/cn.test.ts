import { cn } from '../cn'

describe('cn utility', () => {
  it('combines class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('handles object syntax', () => {
    expect(cn({
      'class1': true,
      'class2': false,
      'class3': true
    })).toBe('class1 class3')
  })

  it('handles array syntax', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('handles mixed inputs', () => {
    expect(cn(
      'base',
      ['array1', 'array2'],
      { 'object1': true, 'object2': false },
      true && 'conditional'
    )).toBe('base array1 array2 object1 conditional')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null)).toBe('')
    expect(cn(undefined)).toBe('')
  })

  it('handles Tailwind class conflicts (twMerge functionality)', () => {
    // twMerge should resolve conflicts between similar Tailwind classes
    expect(cn('p-4', 'p-2')).toBe('p-2')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles complex Tailwind scenarios', () => {
    expect(cn(
      'bg-red-500',
      'hover:bg-blue-500',
      'bg-green-500' // This should override bg-red-500
    )).toBe('hover:bg-blue-500 bg-green-500')
  })

  it('preserves non-conflicting classes', () => {
    expect(cn(
      'p-4',
      'm-2',
      'text-center',
      'bg-blue-500'
    )).toBe('p-4 m-2 text-center bg-blue-500')
  })

  it('handles whitespace correctly', () => {
    expect(cn('  class1  ', '  class2  ')).toBe('class1 class2')
  })

  it('handles duplicate classes', () => {
    // twMerge preserves the last occurrence and removes duplicates
    expect(cn('class1', 'class2', 'class1')).toBe('class1 class2 class1')
  })
})
