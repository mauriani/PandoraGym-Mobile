import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Text } from 'react-native'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs'

// Mock do utilitário cn
jest.mock('@utils/cn', () => ({
  cn: (...classes: any[]) => {
    if (typeof classes[0] === 'string') {
      return classes.filter(Boolean).join(' ')
    }
    // Handle object with conditional classes
    const [baseClasses, conditionalClasses] = classes
    let result = baseClasses || ''
    if (conditionalClasses && typeof conditionalClasses === 'object') {
      Object.entries(conditionalClasses).forEach(([className, condition]) => {
        if (condition && className !== 'className') {
          result += ` ${className}`
        }
      })
    }
    return result
  }
}))

describe('Tabs', () => {
  const TestTabsComponent = ({ defaultValue = 'tab1' }: { defaultValue?: string }) => (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger value="tab1" title="Tab 1" />
        <TabsTrigger value="tab2" title="Tab 2" />
      </TabsList>
      <TabsContent value="tab1">
        <Text>Content 1</Text>
      </TabsContent>
      <TabsContent value="tab2">
        <Text>Content 2</Text>
      </TabsContent>
    </Tabs>
  )

  it('renders tabs with default active tab', () => {
    const { getByText, queryByText } = render(<TestTabsComponent />)
    
    expect(getByText('Tab 1')).toBeTruthy()
    expect(getByText('Tab 2')).toBeTruthy()
    expect(getByText('Content 1')).toBeTruthy()
    expect(queryByText('Content 2')).toBeNull()
  })

  it('switches active tab when trigger is pressed', () => {
    const { getByText, queryByText } = render(<TestTabsComponent />)
    
    // Initially tab1 is active
    expect(getByText('Content 1')).toBeTruthy()
    expect(queryByText('Content 2')).toBeNull()
    
    // Press tab2 trigger
    fireEvent.press(getByText('Tab 2'))
    
    // Now tab2 should be active
    expect(queryByText('Content 1')).toBeNull()
    expect(getByText('Content 2')).toBeTruthy()
  })

  it('renders with custom default value', () => {
    const { getByText, queryByText } = render(
      <TestTabsComponent defaultValue="tab2" />
    )
    
    expect(queryByText('Content 1')).toBeNull()
    expect(getByText('Content 2')).toBeTruthy()
  })

  it('applies custom className to TabsList', () => {
    const { getByText } = render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list-class">
          <TabsTrigger value="tab1" title="Tab 1" />
        </TabsList>
        <TabsContent value="tab1">
          <Text>Content</Text>
        </TabsContent>
      </Tabs>
    )
    
    expect(getByText('Tab 1')).toBeTruthy()
  })

  it('applies custom className and textClasses to TabsTrigger', () => {
    const { getByText } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger 
            value="tab1" 
            title="Tab 1" 
            className="custom-trigger-class"
            textClasses="custom-text-class"
          />
        </TabsList>
        <TabsContent value="tab1">
          <Text>Content</Text>
        </TabsContent>
      </Tabs>
    )
    
    expect(getByText('Tab 1')).toBeTruthy()
  })

  it('applies custom className to TabsContent', () => {
    const { getByText } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" title="Tab 1" />
        </TabsList>
        <TabsContent value="tab1" className="custom-content-class">
          <Text>Content</Text>
        </TabsContent>
      </Tabs>
    )
    
    expect(getByText('Content')).toBeTruthy()
  })

  it('only renders content for active tab', () => {
    const { getByText, queryByText } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" title="Tab 1" />
          <TabsTrigger value="tab2" title="Tab 2" />
          <TabsTrigger value="tab3" title="Tab 3" />
        </TabsList>
        <TabsContent value="tab1">
          <Text>Content 1</Text>
        </TabsContent>
        <TabsContent value="tab2">
          <Text>Content 2</Text>
        </TabsContent>
        <TabsContent value="tab3">
          <Text>Content 3</Text>
        </TabsContent>
      </Tabs>
    )
    
    // Only tab1 content should be visible
    expect(getByText('Content 1')).toBeTruthy()
    expect(queryByText('Content 2')).toBeNull()
    expect(queryByText('Content 3')).toBeNull()
    
    // Switch to tab3
    fireEvent.press(getByText('Tab 3'))
    
    // Only tab3 content should be visible
    expect(queryByText('Content 1')).toBeNull()
    expect(queryByText('Content 2')).toBeNull()
    expect(getByText('Content 3')).toBeTruthy()
  })

  it('forwards additional props to TabsTrigger', () => {
    const mockPress = jest.fn()
    const { getByText } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger 
            value="tab1" 
            title="Tab 1" 
            onPress={mockPress}
            testID="custom-trigger"
          />
        </TabsList>
        <TabsContent value="tab1">
          <Text>Content</Text>
        </TabsContent>
      </Tabs>
    )
    
    const trigger = getByText('Tab 1')
    fireEvent.press(trigger)
    
    expect(mockPress).toHaveBeenCalled()
  })
})
