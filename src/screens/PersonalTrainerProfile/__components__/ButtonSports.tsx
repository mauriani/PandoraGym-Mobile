import { Text, TouchableOpacity } from 'react-native'

type IProps = {
  title: string
}

export function ButtonSports({ title }: IProps) {
  return (
    <TouchableOpacity className="bg-secondary rounded-[6px] px-2 py-2">
      <Text className="text-white primary_bold font-bold text-md">{title}</Text>
    </TouchableOpacity>
  )
}
