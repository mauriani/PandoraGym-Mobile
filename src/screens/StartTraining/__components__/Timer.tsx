import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Sound from 'react-native-sound'
import { IconComponent } from '@components/IconComponent'

type IProps = {
  initialSeconds: number
}

export default function Timer({ initialSeconds }: IProps) {
  const [time, setTime] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const alarmSound = new Sound('alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Erro ao carregar o som:', error)
    }
  })

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
      alarmSound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
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
