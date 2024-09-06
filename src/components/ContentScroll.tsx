import { ScrollView } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function ContentScroll({ children }: IProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 12,
        paddingBottom: 200,
        paddingTop: 30,
        paddingHorizontal: 20,
      }}>
      {children}
    </ScrollView>
  )
}
