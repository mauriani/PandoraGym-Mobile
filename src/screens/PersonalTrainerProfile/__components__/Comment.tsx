import { Image, Text, View } from 'react-native'
import { IComment } from '@_dtos_/commentDTO'

type IProps = {
  item: IComment
}

export function Comment({ item }: IProps) {
  return (
    <View className="bg-secondary rounded-[6px] px-2 py-2 gap-2">
      <View className="flex-row gap-2 items-center">
        <Image
          className="h-10 w-10 rounded-full"
          source={{
            uri: item.image,
          }}
          alt=""
        />

        <View>
          <Text className="text-foreground text-md font-primary_bold">
            {item.name}
          </Text>
          <Text className="text-muted-foreground text-xs">
            {item.date_created}
          </Text>
        </View>
      </View>

      <Text className="text-foreground font-primary_regular text-md leading-6 mt-2">
        {item.comment}
      </Text>
    </View>
  )
}
