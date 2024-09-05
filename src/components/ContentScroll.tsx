import { ScrollView } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function ContentScroll({ children }: IProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 12,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 40,

        paddingBottom: 100,
      }}>
      {children}
    </ScrollView>
  )
}
