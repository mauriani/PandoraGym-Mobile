import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'

type IProps = {
  initialSeconds: number
}

export default function Timer({ initialSeconds }: IProps) {
  const [time, setTime] = useState(initialSeconds || 0)

  const [isRunning, setIsRunning] = useState(false)

  // Formatação de tempo (minutos e segundos)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Iniciar ou pausar o timer
  const toggleTimer = () => {
    if (time > 0) {
      setIsRunning(!isRunning)
    }
  }

  // useEffect para contar regressivamente
  useEffect(() => {
    let interval
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0 && isRunning) {
      // Tocar alarme quando o tempo terminar
      Alert.alert('Timer finalizado!', 'O tempo terminou!')
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
        onPress={() => toggleTimer()}
        className="flex-row items-center justify-center bg-neutral-700 rounded-[6px] px-5 py-2">
        <IconComponent
          iconName="Timer"
          style={{ position: 'absolute', left: 5 }}
        />

        <Text className="text-white text-lg font-bold ml-4">
          {isRunning ? formatTime(time) : `Descanço`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
