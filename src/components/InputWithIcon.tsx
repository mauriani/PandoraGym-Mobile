import { useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import zod from 'zod'

import { InputFormControl } from './ui/InputFormControl'
import { IconComponent, IconNames } from './IconComponent'

type IProps = {
  onChangeText?: (text: string) => void
  onNavigate?: () => void
  iconName: IconNames
  color?: string
  size?: number
  label: string
}

const schema = zod.object({
  name: zod.string().min(1, { message: 'O campo de nome é obrigatório !' }),
})

export type zodSchema = zod.infer<typeof schema>

export function InputWithIcon({ iconName, color, size, label }: IProps) {
  const { navigate } = useNavigation()

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  function submit(data: zodSchema) {
    navigate('createTrainingFirstStep', {
      title: data.name,
    })
  }

  return (
    <View className="flex-row w-[100%] mb-5">
      <InputFormControl
        control={control}
        name="name"
        label={label}
        error={errors.name}
        className="w-[85%] h-15"
      />

      <TouchableOpacity
        className="rounded-[6px] bg-purple-800 w-16 max-h-14 justify-center items-center ml-2 z-10"
        onPress={handleSubmit(submit)}>
        <IconComponent iconName={iconName} color={color} size={size} />
      </TouchableOpacity>
    </View>
  )
}
