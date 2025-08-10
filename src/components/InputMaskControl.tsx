import React, { forwardRef, useContext } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
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
  change?: (value: string) => void
  type?: 'date' | 'cpf' | 'phone' | 'cep' | 'minutes'
}

const InputMaskControl = forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(
  (
    {
      className,
      label,
      placeholder,
      name,
      control,
      defaultValue,
      error,
      change,
      type = 'default',
      ...props
    },
    ref,
  ) => {
    const { colorScheme } = useContext(ThemeContext)
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
          render={({ field: { value, onChange } }) => {
            const commonProps = {
              value,
              onChangeText: (val: string) => {
                onChange(val)
                change && change(val)
              },
              isError: Boolean(error),
              placeholder: placeholder || label,
              ...props,
            }

            return (
              <View className="relative justify-center">
                {(() => {
                  switch (type) {
                    case 'date':
                      return (
                        <TextInputMask
                          ref={ref}
                          {...commonProps}
                          type="datetime"
                          options={{ format: 'DD/MM/YYYY' }}
                          placeholderTextColor={
                            themes[colorScheme].mutedForeground
                          }
                          style={[
                            {
                              borderColor: themes[colorScheme].border,
                              borderWidth: 1,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              color: themes[colorScheme].foreground,
                              borderRadius: 10,
                              backgroundColor: themes[colorScheme].background,
                              fontSize: 14,
                              lineHeight: 20,
                            },
                          ]}
                        />
                      )
                    case 'minutes':
                      return (
                        <TextInputMask
                          ref={ref}
                          {...commonProps}
                          type="datetime"
                          options={{ format: 'mm:ss' }}
                          placeholderTextColor={
                            themes[colorScheme].mutedForeground
                          }
                          style={[
                            {
                              borderColor: themes[colorScheme].border,
                              borderWidth: 1,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              color: themes[colorScheme].foreground,
                              borderRadius: 10,
                              backgroundColor: themes[colorScheme].background,
                              fontSize: 14,
                              lineHeight: 20,
                            },
                          ]}
                        />
                      )
                    case 'cpf':
                      return <TextInputMask ref={ref} {...commonProps} type="cpf" />
                    case 'phone':
                      return (
                        <TextInputMask
                          ref={ref}
                          {...commonProps}
                          type="cel-phone"
                          placeholderTextColor={
                            themes[colorScheme].mutedForeground
                          }
                          options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                          }}
                          style={[
                            {
                              borderColor: themes[colorScheme].border,
                              borderWidth: 1,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              color: themes[colorScheme].foreground,
                              borderRadius: 10,
                              backgroundColor: themes[colorScheme].background,
                              fontSize: 14,
                              lineHeight: 20,
                            },
                          ]}
                        />
                      )
                    case 'cep':
                      return (
                        <TextInputMask
                          ref={ref}
                          {...commonProps}
                          type="zip-code"
                          placeholderTextColor={
                            themes[colorScheme].mutedForeground
                          }
                          style={[
                            {
                              borderColor: themes[colorScheme].border,
                              borderWidth: 1,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              color: themes[colorScheme].foreground,
                              borderRadius: 10,
                              backgroundColor: themes[colorScheme].background,
                              fontSize: 14,
                              lineHeight: 20,
                            },
                          ]}
                        />
                      )
                    default:
                      return (
                        <TextInput
                          {...commonProps}
                          ref={ref}
                          placeholderTextColor={
                            themes[colorScheme].mutedForeground
                          }
                          style={[
                            {
                              borderColor: themes[colorScheme].border,
                              borderWidth: 1,
                              paddingVertical: 14,
                              paddingHorizontal: 14,
                              color: themes[colorScheme].foreground,
                              borderRadius: 10,
                              backgroundColor: themes[colorScheme].background,
                              fontSize: 14,
                              lineHeight: 20,
                            },
                          ]}
                        />
                      )
                  }
                })()}
              </View>
            )
          }}
        />

        {error?.message && (
          <Text className="mt-2 pl-1 font-primary_medium text-[12px] text-red-400">
            {error?.message}
          </Text>
        )}
      </View>
    )
  },
)

export { InputMaskControl }
