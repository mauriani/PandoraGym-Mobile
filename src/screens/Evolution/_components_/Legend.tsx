import { Text, View } from 'react-native'

type IDate = {
  label: string
  color: string
}

type IProps = {
  data: IDate[]
}

export function Legend({ data }: IProps) {
  return (
    data &&
    data.map((item, index) => (
      <View key={index} className="flex-row gap-2 rounded-[6px] items-center">
        <View
          className="h-4 w-4"
          style={{
            backgroundColor: item.color,
          }}
        />
        <Text className="text-white font-primary_bold text-base">
          {item.label}
        </Text>
      </View>
    ))
  )
}
