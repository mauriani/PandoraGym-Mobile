import { Text } from 'react-native'

type IProps = {
  title: string
  details: string
}

export function TextDetails({ title, details }: IProps) {
  return (
    <Text className="text-white text-[12px]">
      <Text className="font-bold">{title} • </Text>
      {details}
    </Text>
  )
}
