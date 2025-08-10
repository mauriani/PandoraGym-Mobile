import { Image, Text, View } from 'react-native'
import { ExerciseConfig } from '@_dtos_/detailsTemplateDTO'
import { IconComponent } from '@components/IconComponent'
import { SubTitle } from '@components/SubTitle'
import { convertSecondsToMinutes } from '@utils/formatTime'

type IProps = {
  item: ExerciseConfig
  isPremium?: boolean
  isBlurred?: boolean
}

export function CardDetails({ item, isPremium = false, isBlurred = false }: IProps) {
  return (
    <View className={`h-32 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative ${isBlurred ? 'opacity-60' : ''}`}>
      {/* Premium Badge */}
      {isPremium && (
        <View className="absolute top-2 right-2 z-10 bg-yellow-500 px-2 py-1 rounded-full">
          <View className="flex-row items-center gap-1">
            <IconComponent iconName="Crown" size={10} color="#000" />
            <Text className="text-black font-bold text-xs">PRO</Text>
          </View>
        </View>
      )}

      {/* Exercise Image */}
      <View className="relative">
        <Image
          className="h-full w-20 rounded-[6px]"
          source={{
            uri: item.exerciseThumb,
          }}
          alt=""
        />
        {isBlurred && (
          <View className="absolute inset-0 bg-black/40 rounded-[6px] items-center justify-center">
            <IconComponent iconName="Lock" size={20} color="#FFF" />
          </View>
        )}
      </View>

      <View className="flex-col justify-center gap-1 ml-3 flex-1">
        <Text
          numberOfLines={1}
          className="text-white font-bold text-base"
          style={{ flexShrink: 1, maxWidth: '85%' }}>
          {item.exerciseTitle}
        </Text>
        
        <Text className="text-muted-foreground text-sm">
          {isBlurred ? '? séries x ? repetições' : `${item.sets} séries x ${item.reps} repetições`}
        </Text>

        <View className="flex-row items-center gap-2">
          <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
            <IconComponent iconName="Timer" size={20} />
            <SubTitle
              title={isBlurred ? '?:??' : `${convertSecondsToMinutes(item.restTimeBetweenSets)}`}
            />
          </View>

          <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
            <IconComponent iconName="Weight" size={20} />
            <SubTitle title={isBlurred ? '? kg' : `${item?.load} kg`} />
          </View>
        </View>
      </View>

      {/* Blur overlay for locked content */}
      {isBlurred && (
        <View className="absolute inset-0 bg-black/20 rounded-[8px]" />
      )}
    </View>
  )
}
