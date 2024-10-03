import { Text, TouchableOpacity, View } from 'react-native'

type IProps = {
  label: string
  value: string
}

export function ContentDetails({ label, value }: IProps) {
  return (
    <TouchableOpacity className="flex-row justify-center items-center gap-1 min-h-8 px-1 py-1 rounded-sm bg-muted">
      <View className="flex-col ">
        <Text className="text-primary text-sm font-primary_bold">{value}</Text>
        <Text className="text-primary font-bold text-[10px]">{label}</Text>
      </View>
    </TouchableOpacity>
  )
}
