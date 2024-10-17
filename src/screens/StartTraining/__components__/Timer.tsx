import React from 'react'
import { Text, TouchableOpacity, Vibration, View } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import SoundPlayer from 'react-native-sound-player'
import { IconComponent } from '@components/IconComponent'

type IProps = {
  initialSeconds: number
}

export default function TimerWithSound({ initialSeconds }: IProps) {
  const [isRunning, setIsRunning] = React.useState(false)

  const handleTimerFinish = () => {
    try {
      SoundPlayer.playSoundFile('alarm', 'mp3')
      Vibration.vibrate(500)
    } catch (e) {
      console.log('Erro ao tocar o som', e)
    }
  }

  const formatTime = (remainingTime: number) => {
    const mins = Math.floor(remainingTime / 60)
    const secs = remainingTime % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const startTimer = () => {
    setIsRunning(true)
  }

  return (
    <View className="flex flex-row  items-center justify-center mt-3 mb-3 relative">
      {isRunning ? (
        ''
      ) : (
        <TouchableOpacity
          onPress={startTimer}
          className="flex-row items-center justify-center bg-neutral-700 rounded-[6px] px-5 py-2">
          <IconComponent
            iconName="Timer"
            style={{ position: 'absolute', left: 5 }}
          />
          <Text className="text-white text-lg font-bold ml-4">
            {isRunning ? 'Contando...' : 'Descanso'}
          </Text>
        </TouchableOpacity>
      )}

      {isRunning && (
        <CountdownCircleTimer
          isPlaying={isRunning}
          duration={initialSeconds}
          colors={['#4d2609', '#F7B801', '#A30000']}
          colorsTime={[7, 5, 0]}
          strokeWidth={3}
          size={50}
          onComplete={() => {
            handleTimerFinish()
            setIsRunning(false)
          }}>
          {({ remainingTime }) => (
            <Text className="text-white text-[12px] font-bold">
              {formatTime(remainingTime)}
            </Text>
          )}
        </CountdownCircleTimer>
      )}
    </View>
  )
}
