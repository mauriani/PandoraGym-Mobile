import React, { useContext, useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { CirclePlay } from 'lucide-react-native'

type IProps = {
  videoId: string
  thumbnailUrl: string
}

export function VideoPlayerWithThumbnail({ videoId, thumbnailUrl }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const [playing, setPlaying] = useState(false)

  return (
    <View className="w-[100%] h-72 overflow-hidden rounded-[6px]">
      {playing ? (
        <View className="flex-1">
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={videoId}
            webViewStyle={{ flex: 1, borderRadius: 6 }}
            onChangeState={(state) => {
              if (state === 'ended') {
                setPlaying(false)
              }
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="flex-1"
          onPress={() => setPlaying(!playing)}>
          <ImageBackground
            className="flex-1 justify-center items-center"
            source={{ uri: thumbnailUrl }}>
            <CirclePlay
              color={themes[colorScheme].secondaryForeground}
              size={50}
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </View>
  )
}
