import { Text } from 'react-native'

type IProps = {
  title: String
}

export function SubTitle({ title }: IProps) {
  return (
    <Text className="font-primary_bold text-lg font-bold text-white">
      {title}
    </Text>
  )
}
