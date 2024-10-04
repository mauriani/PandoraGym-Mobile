export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function convertSecondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60)
  const segundosRestantes = seconds % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = segundosRestantes.toString().padStart(2, '0')

  return `${formattedMinutes}m:${formattedSeconds}s`
}

export function secondsToHourMinute(segundos) {
  const hours = Math.floor(segundos / 3600) // Calcula as horas
  const minutesRemaining = segundos % 3600 // Calcula os minutos restantes
  const minutos = Math.floor(minutesRemaining / 60) // Calcula os minutos
  // const secondsRemainingFinals = minutesRemaining % 60 // Calcula os segundos restantes

  // Formata a saída com zero à esquerda para horas e minutos, se necessário
  const horaFormatada = hours.toString().padStart(2, '0')
  const minutoFormatado = minutos.toString().padStart(2, '0')

  return `${horaFormatada}h:${minutoFormatado}min`
}

export function timeStringToSeconds(timeString: string) {
  const [minutes, seconds] = timeString.split(':').map(Number);

  const newValue = minutes * 60 + seconds;
  return newValue
};
 
