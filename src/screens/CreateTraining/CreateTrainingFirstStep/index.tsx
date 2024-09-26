import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { SelectExerciseCard } from '@components/SelectExerciseCard'
import { InputFormControl } from '@components/ui/InputFormControl'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

import { Form } from '../__components__/Form'
import { StepHeader } from '../__components__/StepHeader'

type IRouteParams = {
  title: string
}

const schema = zod.object({
  search: zod.string().min(1, { message: 'O campo de nome é obrigatório !' }),
})

export type zodSchema = zod.infer<typeof schema>

export function CreateTrainingFirstStep() {
  const route = useRoute()
  const { navigate } = useNavigation()
  const [selectedItems, setSelectedItems] = useState([])
  const [exercise, setExercise] = useState<IExercise[] | []>([])
  const [originalExercises, setOriginalExercises] = useState<IExercise[]>([])

  const methods = useForm<zodSchema>()

  const { control } = methods

  const { title } = route.params as IRouteParams

  // Função para alternar a seleção de um item
  const toggleSelectItem = (selectedItem) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (item) => item.id === selectedItem.id,
      )

      if (isAlreadySelected) {
        // Remove o item se já estiver selecionado
        return prevSelectedItems.filter((item) => item.id !== selectedItem.id)
      } else {
        // Adiciona o novo item ao array
        return [...prevSelectedItems, selectedItem]
      }
    })
  }

  const { error } = useQuery<IExercise[]>({
    queryKey: ['get-templates'],
    queryFn: async () => {
      const { data } = await api.get('/templates')

      setExercise(data.exercise)
      setOriginalExercises(data.exercise)

      return data.exercise
    },
  })

  function getTypeInfo(title: string) {
    const newItem: IExercise[] = [...exercise]

    if (title.length > 0) {
      const tipoInfo = newItem.filter((item) =>
        item.exerciseTitle.toLowerCase().includes(title.toLowerCase()),
      )

      setExercise(tipoInfo)
    } else {
      setExercise(originalExercises)
    }
  }

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao carregar os exercicios. Tente novamente mais tarde !'

      toast.error(title)
    }
  }, [error])

  return (
    <Container>
      <>
        <View style={{ flex: 1 }}>
          <HeaderGoBack title={'Criar Treino'} />

          <Form>
            <StepHeader title={title} current={1} />

            <InputFormControl
              control={control}
              name="search"
              label="Buscar exercicio"
              change={(text) => getTypeInfo(text)}
            />

            <Text className="text-foreground font-primary_bold tex-[16]">
              Listagem de exercícios
            </Text>

            <FlatList
              data={exercise}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                paddingBottom: getBottomSpace() + 80,
                gap: 12,
              }}
              renderItem={({ item }) => (
                <SelectExerciseCard
                  item={item}
                  isSelected={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id,
                  )}
                  toggleSelectItem={() => toggleSelectItem(item)}
                />
              )}
            />
          </Form>

          <Footer
            label="Próxima Etapa"
            onSubmit={() =>
              navigate('createTrainingSecondStep', {
                title,
                selectedItems,
              })
            }
          />
        </View>
      </>
    </Container>
  )
}
