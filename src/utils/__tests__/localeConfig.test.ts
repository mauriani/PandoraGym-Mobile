import { ptBR } from '../localeConfig'

describe('localeConfig utils', () => {
  describe('ptBR locale configuration', () => {
    it('has all required properties', () => {
      expect(ptBR).toHaveProperty('monthNames')
      expect(ptBR).toHaveProperty('monthNamesShort')
      expect(ptBR).toHaveProperty('dayNames')
      expect(ptBR).toHaveProperty('dayNamesShort')
      expect(ptBR).toHaveProperty('today')
    })

    describe('monthNames', () => {
      it('contains all 12 months in Portuguese', () => {
        expect(ptBR.monthNames).toHaveLength(12)
        
        const expectedMonths = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ]
        
        expect(ptBR.monthNames).toEqual(expectedMonths)
      })

      it('has unique month names', () => {
        const uniqueMonths = [...new Set(ptBR.monthNames)]
        expect(ptBR.monthNames).toHaveLength(uniqueMonths.length)
      })

      it('all month names are strings', () => {
        ptBR.monthNames.forEach(month => {
          expect(typeof month).toBe('string')
          expect(month.length).toBeGreaterThan(0)
        })
      })
    })

    describe('monthNamesShort', () => {
      it('contains all 12 short month names', () => {
        expect(ptBR.monthNamesShort).toHaveLength(12)
        
        const expectedShortMonths = [
          'Jan', 'Fev', 'Março', 'Abr', 'Mai', 'Jun',
          'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
        ]
        
        expect(ptBR.monthNamesShort).toEqual(expectedShortMonths)
      })

      it('has unique short month names', () => {
        const uniqueShortMonths = [...new Set(ptBR.monthNamesShort)]
        expect(ptBR.monthNamesShort).toHaveLength(uniqueShortMonths.length)
      })

      it('all short month names are strings', () => {
        ptBR.monthNamesShort.forEach(month => {
          expect(typeof month).toBe('string')
          expect(month.length).toBeGreaterThan(0)
        })
      })
    })

    describe('dayNames', () => {
      it('contains all 7 days of the week in Portuguese', () => {
        expect(ptBR.dayNames).toHaveLength(7)
        
        const expectedDays = [
          'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
        ]
        
        expect(ptBR.dayNames).toEqual(expectedDays)
      })

      it('starts with Sunday (Domingo)', () => {
        expect(ptBR.dayNames[0]).toBe('Domingo')
      })

      it('ends with Saturday (Sábado)', () => {
        expect(ptBR.dayNames[6]).toBe('Sábado')
      })

      it('has unique day names', () => {
        const uniqueDays = [...new Set(ptBR.dayNames)]
        expect(ptBR.dayNames).toHaveLength(uniqueDays.length)
      })

      it('all day names are strings', () => {
        ptBR.dayNames.forEach(day => {
          expect(typeof day).toBe('string')
          expect(day.length).toBeGreaterThan(0)
        })
      })
    })

    describe('dayNamesShort', () => {
      it('contains all 7 short day names', () => {
        expect(ptBR.dayNamesShort).toHaveLength(7)
        
        const expectedShortDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
        
        expect(ptBR.dayNamesShort).toEqual(expectedShortDays)
      })

      it('all short day names are uppercase', () => {
        ptBR.dayNamesShort.forEach(day => {
          expect(day).toBe(day.toUpperCase())
        })
      })

      it('all short day names are 3 characters long', () => {
        ptBR.dayNamesShort.forEach(day => {
          expect(day).toHaveLength(3)
        })
      })

      it('has unique short day names', () => {
        const uniqueShortDays = [...new Set(ptBR.dayNamesShort)]
        expect(ptBR.dayNamesShort).toHaveLength(uniqueShortDays.length)
      })
    })

    describe('today property', () => {
      it('has correct Portuguese translation for today', () => {
        expect(ptBR.today).toBe('Hoje')
      })

      it('today is a string', () => {
        expect(typeof ptBR.today).toBe('string')
      })
    })

    describe('calendar integration', () => {
      it('can be used to find month by index', () => {
        expect(ptBR.monthNames[0]).toBe('Janeiro')
        expect(ptBR.monthNames[11]).toBe('Dezembro')
        expect(ptBR.monthNamesShort[0]).toBe('Jan')
        expect(ptBR.monthNamesShort[11]).toBe('Dez')
      })

      it('can be used to find day by index', () => {
        expect(ptBR.dayNames[0]).toBe('Domingo') // Sunday
        expect(ptBR.dayNames[1]).toBe('Segunda') // Monday
        expect(ptBR.dayNames[6]).toBe('Sábado') // Saturday
      })

      it('maintains consistency between long and short names', () => {
        // Check that the order is consistent
        expect(ptBR.dayNames[0]).toBe('Domingo')
        expect(ptBR.dayNamesShort[0]).toBe('DOM')
        
        expect(ptBR.dayNames[1]).toBe('Segunda')
        expect(ptBR.dayNamesShort[1]).toBe('SEG')
      })
    })

    describe('locale object structure', () => {
      it('is a valid locale configuration object', () => {
        expect(typeof ptBR).toBe('object')
        expect(ptBR).not.toBeNull()
        expect(Array.isArray(ptBR.monthNames)).toBe(true)
        expect(Array.isArray(ptBR.monthNamesShort)).toBe(true)
        expect(Array.isArray(ptBR.dayNames)).toBe(true)
        expect(Array.isArray(ptBR.dayNamesShort)).toBe(true)
        expect(typeof ptBR.today).toBe('string')
      })
    })
  })
})
