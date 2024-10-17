import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SoundPlayer from 'react-native-sound-player'
import { IconComponent } from '@components/IconComponent'

type IProps = {
  initialSeconds: number
}

export default function Timer({ initialSeconds }: IProps) {
  const [time, setTime] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const handleTimerFinish = () => {
    try {
      SoundPlayer.playSoundFile('alarm', 'mp3') // 'end_sound' é o nome do arquivo, 'mp3' é a extensão
    } catch (e) {
      console.log('Erro ao tocar o som', e)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const startTimer = () => {
    setTime(initialSeconds)
    setIsRunning(true)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      handleTimerFinish()
      setIsRunning(false)
    }

    return () => clearInterval(interval)
  }, [isRunning, time])

  useEffect(() => {
    setTime(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  return (
    <View className="flex items-center justify-center mt-3 mb-3 relative">
      <TouchableOpacity
        onPress={startTimer}
        className="flex-row items-center justify-center bg-neutral-700 rounded-[6px] px-5 py-2">
        <IconComponent
          iconName="Timer"
          style={{ position: 'absolute', left: 5 }}
        />
        <Text className="text-white text-lg font-bold ml-4">
          {isRunning ? formatTime(time) : 'Descanso'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
