import { forwardRef } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
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

const TextAreaFormControl = forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(
  ({
    className,
    inputClasses,
    label,
    placeholder,
    name,
    control,
    defaultValue,
    error,
    change,
    ...props
  }) => {
    return (
      <View className={cn('flex flex-col gap-1', className)}>
        {placeholder && (
          <Text className="text-muted-foreground font-primary_regular pb-1">
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
                multiline
                onChangeText={(value) => {
                  onChange(value)
                  change && change(value)
                }}
                className={cn(
                  inputClasses,
                  'border border-input py-4 px-4 min-h-40 rounded-lg text-white text-sm bg-black', // Fundo preto, texto branco
                )}
                {...props}
              />
            </View>
          )}
        />

        {error?.message != undefined && (
          <Text className="text-[12px] text-red-400 font-primary_medium mt-2 pl-1">
            {error?.message}
          </Text>
        )}
      </View>
    )
  },
)

export { TextAreaFormControl }
