import React, { useContext } from 'react'
import { Image, Text, useWindowDimensions, View } from 'react-native'
import RenderHtml, { MixedStyleDeclaration } from 'react-native-render-html'
import { IComment } from '@_dtos_/commentDTO'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

type IProps = {
  item: IComment
}

export function Comment({ item }: IProps) {
  const { width } = useWindowDimensions()
  const { colorScheme } = useContext(ThemeContext)

  const tagsStyles: Readonly<Record<string, MixedStyleDeclaration>> =
    React.useMemo(
      () => ({
        body: {
          fontSize: 14,
          color: themes[colorScheme].foreground,
          lineHeight: 20,
        },
      }),
      [],
    )
  return (
    <View className="bg-secondary rounded-[6px] px-2 py-2 gap-2">
      <View className="flex-row gap-2 items-center">
        <Image
          className="h-10 w-10 rounded-full"
          source={{
            uri: item.avatarUrl,
          }}
          alt=""
        />

        <View>
          <Text className="text-foreground text-base font-primary_bold ">
            {item.name}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {item.createdAt}
          </Text>
        </View>
      </View>

      <>
        <RenderHtml
          contentWidth={width}
          source={{ html: item.comment }}
          tagsStyles={tagsStyles}
        />
      </>
    </View>
  )
}
