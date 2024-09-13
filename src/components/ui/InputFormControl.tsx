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
    ...props
  }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false)

    return (
      <View className={cn('flex flex-col gap-1', className)}>
        {placeholder && (
          <Text className="text-muted-foreground font-primary_regular pb-2">
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
                onChangeText={onChange}
                secureTextEntry={typePassword && !isPasswordVisible}
                className={cn(
                  inputClasses,
                  'border border-input py-4 px-4 rounded-lg text-white text-sm bg-black', // Fundo preto, texto branco
                )}
                {...props}
              />

              {typePassword && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!isPasswordVisible)}
                  className="absolute right-1 top-4 h-16 w-14 justify-center items-center">
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
          <Text className="text-xs text-red-300 font-primary_medium">
            {error?.message}
          </Text>
        )}
      </View>
    )
  },
)

export { InputFormControl }
