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
    <View className="flex-row w-[100%] mb-5">
      <InputFormControl
        control={control}
        name="name"
        label={label}
        error={errors.name}
        className="w-[85%]"
        inputClasses="h-16"
        change={(text) => {
          onChangeText && onChangeText(text)
        }}
      />

      <TouchableOpacity
        className="rounded-[6px] bg-primary w-16 h-16 justify-center items-center ml-2"
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
