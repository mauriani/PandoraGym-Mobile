import { daysOfWeek } from '../weekDay'

describe('weekDay utils', () => {
  describe('daysOfWeek', () => {
    it('contains all 7 days of the week', () => {
      expect(daysOfWeek).toHaveLength(7)
    })

    it('has correct structure for each day', () => {
      daysOfWeek.forEach((day) => {
        expect(day).toHaveProperty('label')
        expect(day).toHaveProperty('value')
        expect(day).toHaveProperty('key')
        expect(typeof day.label).toBe('string')
        expect(typeof day.value).toBe('string')
        expect(typeof day.key).toBe('number')
      })
    })

    it('has correct order starting from Sunday (key 0)', () => {
      expect(daysOfWeek[0]).toEqual({ label: 'Domingo', value: 'Dom', key: 0 })
      expect(daysOfWeek[1]).toEqual({ label: 'Segunda', value: 'Seg', key: 1 })
      expect(daysOfWeek[2]).toEqual({ label: 'Terça', value: 'Ter', key: 2 })
      expect(daysOfWeek[3]).toEqual({ label: 'Quarta', value: 'Qua', key: 3 })
      expect(daysOfWeek[4]).toEqual({ label: 'Quinta', value: 'Qui', key: 4 })
      expect(daysOfWeek[5]).toEqual({ label: 'Sexta', value: 'Sex', key: 5 })
      expect(daysOfWeek[6]).toEqual({ label: 'Sábado', value: 'Sab', key: 6 })
    })

    it('has unique keys for each day', () => {
      const keys = daysOfWeek.map(day => day.key)
      const uniqueKeys = [...new Set(keys)]
      expect(keys).toHaveLength(uniqueKeys.length)
    })

    it('has unique labels for each day', () => {
      const labels = daysOfWeek.map(day => day.label)
      const uniqueLabels = [...new Set(labels)]
      expect(labels).toHaveLength(uniqueLabels.length)
    })

    it('has unique values for each day', () => {
      const values = daysOfWeek.map(day => day.value)
      const uniqueValues = [...new Set(values)]
      expect(values).toHaveLength(uniqueValues.length)
    })

    it('keys are sequential from 0 to 6', () => {
      const keys = daysOfWeek.map(day => day.key)
      expect(keys).toEqual([0, 1, 2, 3, 4, 5, 6])
    })

    it('can be used to find day by key', () => {
      const findDayByKey = (key: number) => daysOfWeek.find(day => day.key === key)
      
      expect(findDayByKey(0)?.label).toBe('Domingo')
      expect(findDayByKey(3)?.label).toBe('Quarta')
      expect(findDayByKey(6)?.label).toBe('Sábado')
      expect(findDayByKey(7)).toBeUndefined()
    })

    it('can be used to find day by value', () => {
      const findDayByValue = (value: string) => daysOfWeek.find(day => day.value === value)
      
      expect(findDayByValue('Dom')?.label).toBe('Domingo')
      expect(findDayByValue('Qua')?.label).toBe('Quarta')
      expect(findDayByValue('Sab')?.label).toBe('Sábado')
      expect(findDayByValue('Invalid')).toBeUndefined()
    })

    it('can be used to get weekdays only', () => {
      const weekdays = daysOfWeek.filter(day => day.key >= 1 && day.key <= 5)
      expect(weekdays).toHaveLength(5)
      expect(weekdays[0].label).toBe('Segunda')
      expect(weekdays[4].label).toBe('Sexta')
    })

    it('can be used to get weekend days', () => {
      const weekendDays = daysOfWeek.filter(day => day.key === 0 || day.key === 6)
      expect(weekendDays).toHaveLength(2)
      expect(weekendDays[0].label).toBe('Domingo')
      expect(weekendDays[1].label).toBe('Sábado')
    })
  })
})
