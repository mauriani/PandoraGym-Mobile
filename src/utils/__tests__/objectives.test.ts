import { objectives } from '../objectives'

describe('objectives utils', () => {
  describe('objectives', () => {
    it('contains all expected objectives', () => {
      expect(objectives).toHaveLength(9)
    })

    it('has correct structure for each objective', () => {
      objectives.forEach((objective) => {
        expect(objective).toHaveProperty('value')
        expect(objective).toHaveProperty('label')
        expect(typeof objective.value).toBe('string')
        expect(typeof objective.label).toBe('string')
        expect(objective.value).toBe(objective.label) // value and label should be the same
      })
    })

    it('contains expected objective values', () => {
      const expectedObjectives = [
        'Perda de peso',
        'Ganho de massa muscular',
        'Aumento de força',
        'Melhora da resistência cardiovascular',
        'Definição muscular',
        'Aumento da flexibilidade',
        'Preparação para competição',
        'Reabilitação de lesões',
        'Saúde geral e bem-estar'
      ]

      const objectiveValues = objectives.map(obj => obj.value)
      expect(objectiveValues).toEqual(expectedObjectives)
    })

    it('has unique values for each objective', () => {
      const values = objectives.map(obj => obj.value)
      const uniqueValues = [...new Set(values)]
      expect(values).toHaveLength(uniqueValues.length)
    })

    it('has unique labels for each objective', () => {
      const labels = objectives.map(obj => obj.label)
      const uniqueLabels = [...new Set(labels)]
      expect(labels).toHaveLength(uniqueLabels.length)
    })

    it('can be used to find objective by value', () => {
      const findObjectiveByValue = (value: string) => 
        objectives.find(obj => obj.value === value)
      
      expect(findObjectiveByValue('Perda de peso')?.label).toBe('Perda de peso')
      expect(findObjectiveByValue('Ganho de massa muscular')?.label).toBe('Ganho de massa muscular')
      expect(findObjectiveByValue('Invalid objective')).toBeUndefined()
    })

    it('can be filtered by category', () => {
      const muscleRelated = objectives.filter(obj => 
        obj.value.includes('massa') || obj.value.includes('força') || obj.value.includes('Definição')
      )
      expect(muscleRelated).toHaveLength(3)
    })

    it('can be used in dropdown/select components', () => {
      // Test that the structure is suitable for form components
      objectives.forEach(objective => {
        expect(objective).toHaveProperty('value')
        expect(objective).toHaveProperty('label')
        expect(objective.value).toBeTruthy()
        expect(objective.label).toBeTruthy()
      })
    })

    it('contains health and fitness related objectives', () => {
      const healthRelated = objectives.filter(obj => 
        obj.value.includes('Saúde') || obj.value.includes('bem-estar') || obj.value.includes('Reabilitação')
      )
      expect(healthRelated.length).toBeGreaterThan(0)
    })

    it('contains performance related objectives', () => {
      const performanceRelated = objectives.filter(obj => 
        obj.value.includes('força') || obj.value.includes('resistência') || obj.value.includes('competição')
      )
      expect(performanceRelated.length).toBeGreaterThan(0)
    })

    it('contains body composition related objectives', () => {
      const bodyCompositionRelated = objectives.filter(obj => 
        obj.value.includes('peso') || obj.value.includes('massa') || obj.value.includes('Definição')
      )
      expect(bodyCompositionRelated.length).toBeGreaterThan(0)
    })
  })
})
