import { Text, TouchableOpacity } from 'react-native'

type IProps = {
  title: string
}

export function ButtonSports({ title }: IProps) {
  return (
    <TouchableOpacity className="rounded-[6px] bg-secondary px-2 py-2">
      <Text className="primary_bold text-md font-bold text-white">{title}</Text>
    </TouchableOpacity>
  )
}
