import React, { createContext, useContext, useEffect, useState } from 'react'
import { saveStartWorkoutStorage } from '@storage/index'

type IPropsCurrentWorkout = {
  name: string
  image: string
  exerciseTitle: string
  // duration: number
}

interface WorkoutContextProps {
  currentWorkout: IPropsCurrentWorkout
  onSetCurrentWorkout: (item: IPropsCurrentWorkout) => void
  elapsedTime: number
  onSetCurrentWorkoutUpdate: (item: IPropsCurrentWorkout) => void
}

const WorkoutContext = createContext<WorkoutContextProps>(
  {} as WorkoutContextProps,
)

export const useWorkout = () => useContext(WorkoutContext)

export const WorkoutProvider = ({ children }) => {
  const startTime = new Date()
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [timer, setTimer] = useState(null)

  function onSetCurrentWorkout(item: IPropsCurrentWorkout) {
    saveStartWorkoutStorage(startTime)
    setCurrentWorkout(item)
    setElapsedTime(0)

    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
    setTimer(interval)
  }

  function onSetCurrentWorkoutUpdate(item: IPropsCurrentWorkout) {
    setCurrentWorkout(item)
  }

  useEffect(() => {
    return () => clearInterval(timer)
  }, [timer])

  return (
    <WorkoutContext.Provider
      value={{
        currentWorkout,
        onSetCurrentWorkout,
        elapsedTime,
        onSetCurrentWorkoutUpdate,
      }}>
      {children}
    </WorkoutContext.Provider>
  )
}
