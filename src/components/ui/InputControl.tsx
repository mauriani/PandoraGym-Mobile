import { forwardRef } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { cn } from '@utils/cn'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  value?: string
  control: Control<FieldValues>
  name: string
  error?: FieldError | undefined
}

const InputControl = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, inputClasses, control, name, error, ...props }) => (
    <View className={cn('flex flex-col', className)}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value}
            placeholder={label} // O label será usado como placeholder
            placeholderTextColor="gray" // Cor do placeholder
            className={cn(
              inputClasses,
              'border border-input py-4 px-4 rounded-lg text-white text-sm bg-black', // Fundo preto, texto branco
            )}
            {...props}
          />
        )}
      />
      {error && (
        <Text className="text-destructive text-[10px] mt-1 mb-2 font-bold">
          {error.message}
        </Text>
      )}
    </View>
  ),
)

export { InputControl }
