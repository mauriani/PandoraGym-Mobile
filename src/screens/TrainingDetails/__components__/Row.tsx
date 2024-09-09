import { View } from 'react-native'

type IProps = {
  children: React.ReactNode
}

export function Row({ children }: IProps) {
  return <View className="flex-row gap-1">{children}</View>
}
