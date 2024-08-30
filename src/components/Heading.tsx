import { Text } from 'react-native'

type IProps = {
  title: string
}

export function Heading({ title }: IProps) {
  return <Text className="text-white font-bold text-lg mb-2">{title}</Text>
}
