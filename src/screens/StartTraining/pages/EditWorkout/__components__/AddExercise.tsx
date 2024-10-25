import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { Button } from '@components/ui/Button'
import { InputFormControl } from '@components/ui/InputFormControl'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

import { CardExercisesSelect } from './CardExercisesSelect'

const schema = zod.object({
  search: zod.string().optional(),
})

export type zodSchema = zod.infer<typeof schema>

type IProps = {
  updateExercises: (item: StartExerciseDTO[]) => void
  onClose: () => void
}

export function AddExercise({ updateExercises, onClose }: IProps) {
  const methods = useForm<zodSchema>()
  const { control } = methods

  const { error } = useQuery<IExercise[]>({
    queryKey: ['get-templates'],
    queryFn: async () => {
      const { data } = await api.get('/templates')

      setFilteredExercises(data.exercise)
      setOriginalExercises(data.exercise)

      return data.exercise
    },
  })

  const [filteredExercises, setFilteredExercises] = useState<IExercise[]>([])
  const [originalExercises, setOriginalExercises] = useState<IExercise[]>([])
  const [selected, setSelected] = useState([])

  function handleSearchExercise(title: string) {
    const newItem: IExercise[] = [...filteredExercises]

    if (title.length > 0) {
      const tipoInfo = newItem.filter((item) =>
        item.exerciseTitle.toLowerCase().includes(title.toLowerCase()),
      )

      setFilteredExercises(tipoInfo)
    } else {
      setFilteredExercises(originalExercises)
    }
  }

  function toggleSelectItem(selectedItem: IExercise) {
    setSelected((prevSelectedItems) => {
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

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  return (
    <>
      <InputFormControl
        control={control}
        name="search"
        label="Buscar exercicio"
        change={(text) => handleSearchExercise(text)}
      />

      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: getBottomSpace() + 30,
          gap: 12,
        }}
        renderItem={({ item }) => (
          <CardExercisesSelect
            item={item}
            isSelected={selected.some(
              (selectedItem) => selectedItem.id === item.id,
            )}
            toggleSelectItem={() => toggleSelectItem(item)}
          />
        )}
      />
      <View>
        <Button
          label="Adicionar"
          variant="secondary"
          onPress={() => {
            updateExercises(selected)
            onClose()
          }}
        />
      </View>
    </>
  )
}
