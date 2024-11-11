import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import zod from 'zod'

import { InputFormControl } from './ui/InputFormControl'
import { IconComponent, IconNames } from './IconComponent'

type IProps = {
  onChangeText?: (text: string) => void
  onNavigate?: (title: string) => void
  iconName: IconNames
  color?: string
  size?: number
  label: string
}

const schema = zod.object({
  name: zod.string().min(1, { message: 'O campo de nome é obrigatório !' }),
})

export type zodSchema = zod.infer<typeof schema>

export function InputWithButton({
  iconName,
  size,
  label,
  onNavigate,
  onChangeText,
}: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function submit(data: zodSchema) {
    onNavigate(data.name)
  }

  return (
    <View className="mb-5 w-[100%] flex-row">
      <InputFormControl
        control={control}
        name="name"
        label={label}
        error={errors.name}
        className="flex-1"
        inputClasses="h-16"
        change={(text) => {
          onChangeText && onChangeText(text)
        }}
      />

      <TouchableOpacity
        className="ml-2 h-16 w-16 items-center justify-center rounded-[6px] bg-primary"
        onPress={handleSubmit(submit)}>
        <IconComponent
          iconName={iconName}
          color={themes[colorScheme].primaryForeground}
          size={size}
        />
      </TouchableOpacity>
    </View>
  )
}
