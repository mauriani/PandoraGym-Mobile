import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { StartExerciseDTO } from '@_dtos_/startExerciseDTO'
import { InputMaskControl } from '@components/InputMaskControl'
import { Button } from '@components/ui/Button'
import { Checkbox } from '@components/ui/Checkbox'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertSecondsToMinutes } from '@utils/formatTime'
import zod from 'zod'

export type IData = {
  reps?: number
  sets?: number
  restTimeBetweenSets?: string
  load?: number
}

type IProps = {
  item: StartExerciseDTO
  onUpdateExercises: (id: string, data: IData, changeAll: boolean) => void
}

const schema = zod.object({
  reps: zod
    .string({ required_error: 'Campo obrigatório!' })
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .transform((value) => (value ? parseInt(value) : null))
    .nullable(),
  sets: zod
    .string({ required_error: 'Campo obrigatório!' })
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .transform((value) => (value ? parseInt(value) : null))
    .nullable(),
  restTimeBetweenSets: zod
    .string({ required_error: 'Campo obrigatório!' })
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .nullable(),
  load: zod
    .string({ required_error: 'Campo obrigatório!' })
    .min(1, {
      message: 'Campo obrigatório!',
    })
    .transform((value) => (value ? parseInt(value) : null))
    .nullable(),
})

export type zodSchema = zod.infer<typeof schema>

export function ConfigExercisesEdit({ item, onUpdateExercises }: IProps) {
  const [isSelected, setIsSelected] = useState(false)

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function submit(data: zodSchema) {
    onUpdateExercises(item.id, data, isSelected)
  }

  return (
    <View className="gap-3 py-3">
      <View className="flex-row justify-between">
        <InputFormControl
          control={control}
          name="sets"
          placeholder="Número de sets/rodadas"
          label={'Rodadas'}
          error={errors.sets}
          defaultValue={`${item?.sets}`}
          keyboardType="numeric"
        />

        <InputFormControl
          control={control}
          name="reps"
          placeholder="Número de repetições"
          label={'Reps'}
          error={errors.reps}
          defaultValue={`${item?.reps}`}
          keyboardType="numeric"
        />
      </View>

      <View className="flex-row justify-between">
        <InputMaskControl
          control={control}
          name="restTimeBetweenSets"
          placeholder="Descanso em mm:ss"
          label={'Descanso em mm:ss'}
          error={errors.restTimeBetweenSets}
          defaultValue={`${convertSecondsToMinutes(item.restTimeBetweenSets)}`}
          keyboardType="numeric"
          type="minutes"
        />

        <InputFormControl
          control={control}
          name="load"
          placeholder="Carga utilizada"
          label={'Peso Kg'}
          error={errors.load}
          className="w-40"
          keyboardType="numeric"
          defaultValue={`${item?.load}`}
        />
      </View>

      <View className="mb-2 mt-2 flex-row items-center gap-4">
        <Checkbox
          isChecked={isSelected}
          onPress={() => setIsSelected(!isSelected)}
        />

        <Text className="font-primary_bold text-base text-foreground">
          Aplicar para todos os exercicios
        </Text>
      </View>

      <Button
        label="Concluir"
        className="px-5"
        onPress={handleSubmit(submit)}
      />
    </View>
  )
}
