import React from 'react'
import { render } from '@testing-library/react-native'
import { Text, ScrollView } from 'react-native'
import { ContentScroll } from '../ContentScroll'

describe('ContentScroll', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ContentScroll>
        <Text>Test Content</Text>
      </ContentScroll>
    )
    
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('renders as ScrollView component', () => {
    const { UNSAFE_getByType } = render(
      <ContentScroll>
        <Text>Content</Text>
      </ContentScroll>
    )
    
    expect(UNSAFE_getByType(ScrollView)).toBeTruthy()
  })

  it('applies correct contentContainerStyle', () => {
    const { UNSAFE_getByType } = render(
      <ContentScroll>
        <Text>Content</Text>
      </ContentScroll>
    )
    
    const scrollView = UNSAFE_getByType(ScrollView)
    expect(scrollView.props.contentContainerStyle).toEqual({
      gap: 12,
      paddingBottom: 200,
      paddingTop: 30,
      paddingHorizontal: 20,
    })
  })

  it('renders multiple children', () => {
    const { getByText } = render(
      <ContentScroll>
        <Text>First Child</Text>
        <Text>Second Child</Text>
        <Text>Third Child</Text>
      </ContentScroll>
    )
    
    expect(getByText('First Child')).toBeTruthy()
    expect(getByText('Second Child')).toBeTruthy()
    expect(getByText('Third Child')).toBeTruthy()
  })
})
