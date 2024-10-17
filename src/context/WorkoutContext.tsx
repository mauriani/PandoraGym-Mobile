import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import {
  getStartWorkoutStorage,
  saveCurrentWorkoutStorage,
  saveStartWorkoutStorage,
} from '@storage/index'
import { differenceInMilliseconds } from 'date-fns'

export type IPropsCurrentWorkout = {
  name: string
  exercise: StartExerciseDTO
  id: string
}

interface WorkoutContextProps {
  onSetCurrentWorkout: (item: IPropsCurrentWorkout) => void
  elapsedTime: number
  onSetCurrentWorkoutUpdate: (item: IPropsCurrentWorkout) => void
}

const WorkoutContext = createContext<WorkoutContextProps>(
  {} as WorkoutContextProps,
)

export const useWorkout = () => useContext(WorkoutContext)

export const WorkoutProvider = ({ children }) => {
  const startTimeRef = useRef<Date | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const now = new Date()
        const diffInMilliseconds = differenceInMilliseconds(
          now,
          startTimeRef.current,
        )
        setElapsedTime(Math.floor(diffInMilliseconds / 1000))
      }
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const onSetCurrentWorkout = useCallback(
    (item: IPropsCurrentWorkout) => {
      const now = new Date()
      startTimeRef.current = now

      saveStartWorkoutStorage(now.toISOString())
      saveCurrentWorkoutStorage(item)

      setElapsedTime(0)
      stopTimer()
      startTimer()
    },
    [startTimer, stopTimer],
  )

  const onSetCurrentWorkoutUpdate = useCallback(
    (item: IPropsCurrentWorkout) => {
      saveCurrentWorkoutStorage(item)
    },
    [],
  )

  useEffect(() => {
    const loadWorkoutData = async () => {
      const savedStartTime = await getStartWorkoutStorage()

      if (savedStartTime && !isNaN(Date.parse(savedStartTime))) {
        startTimeRef.current = new Date(savedStartTime)
        startTimer()
      }
    }

    loadWorkoutData()

    return () => stopTimer()
  }, [startTimer, stopTimer])

  return (
    <WorkoutContext.Provider
      value={{
        onSetCurrentWorkout,
        elapsedTime,
        onSetCurrentWorkoutUpdate,
      }}>
      {children}
    </WorkoutContext.Provider>
  )
}
