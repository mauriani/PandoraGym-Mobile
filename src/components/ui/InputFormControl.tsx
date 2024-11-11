import { forwardRef, useState } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { cn } from '@utils/cn'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  placeholder?: string
  name: string
  control: Control<FieldValues>
  defaultValue?: string
  error?: FieldError | undefined
  typePassword?: boolean
  change?: (value: string) => void
}

const InputFormControl = forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(
  ({
    className,
    label,
    inputClasses,
    placeholder,
    name,
    control,
    defaultValue,
    error,
    typePassword = false,
    change,
    ...props
  }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    return (
      <View className={cn('flex flex-col gap-1', className)}>
        {placeholder && (
          <Text className="pb-1 font-primary_regular text-muted-foreground">
            {placeholder}
          </Text>
        )}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ?? ''}
          render={({ field: { value, onChange } }) => (
            <View className="relative justify-center">
              <TextInput
                placeholder={label}
                placeholderTextColor="gray"
                value={value}
                onChangeText={(value) => {
                  onChange(value)
                  change && change(value)
                }}
                secureTextEntry={typePassword && !isPasswordVisible}
                className={cn(
                  inputClasses,
                  'rounded-lg border border-input bg-black px-4 py-4 text-sm text-white', // Fundo preto, texto branco
                )}
                {...props}
              />

              {typePassword && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  className="absolute right-1 top-4 h-16 w-14 items-center justify-center">
                  <IconComponent
                    iconName={isPasswordVisible ? 'Eye' : 'EyeOff'}
                    color="white"
                    size={20}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        {error?.message != undefined && (
          <Text className="mt-2 pl-1 font-primary_medium text-[12px] text-red-400">
            {error?.message}
          </Text>
        )}
      </View>
    )
  },
)

export { InputFormControl }
