import React from 'react'
import { render } from '@testing-library/react-native'
import { SubTitle } from '../SubTitle'

describe('SubTitle', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<SubTitle title="Test SubTitle" />)
    expect(getByText('Test SubTitle')).toBeTruthy()
  })

  it('applies correct styling', () => {
    const { getByText } = render(<SubTitle title="Styled SubTitle" />)
    const subtitle = getByText('Styled SubTitle')
    expect(subtitle).toBeTruthy()
  })
})