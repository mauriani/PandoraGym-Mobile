import { Text, TouchableOpacity, View } from 'react-native'

type IProps = {
  label: string
  value: string
}

export function ContentDetails({ label, value }: IProps) {
  return (
    <TouchableOpacity className="min-h-8 flex-row items-center justify-center gap-1 rounded-sm bg-muted px-1 py-1">
      <View className="flex-col">
        <Text className="font-primary_bold text-sm text-primary">{value}</Text>
        <Text className="text-[10px] font-bold text-primary">{label}</Text>
      </View>
    </TouchableOpacity>
  )
}
