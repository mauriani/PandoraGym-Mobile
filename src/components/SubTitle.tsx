import { Text } from 'react-native'

type IProps = {
  title: String
}

export function SubTitle({ title }: IProps) {
  return (
    <Text className="text-white font-primary_regular tex-[18px]">{title}</Text>
  )
}
