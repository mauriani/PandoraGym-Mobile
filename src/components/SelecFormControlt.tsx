import React, { useContext } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

import { IconComponent } from './IconComponent'

interface IData {
  label: string
  value: string
  key?: number | string
}

interface IProps {
  name: string
  defaultValue?: string
  label?: string
  error?: FieldError | undefined
  control: Control<FieldValues>
  options: IData[]
  change?: (value: string) => void
}

export function SelecFormControlt({
  name,
  error,
  label,
  defaultValue,
  options,
  control,
  change,
}: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <>
      <>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ?? ''}
          render={({ field: { value, onChange } }) => {
            return (
              <View>
                <SelectDropdown
                  data={options}
                  onSelect={(selectedItem) => {
                    onChange(selectedItem.value)
                    change && change(selectedItem.value)
                  }}
                  renderButton={(selectedItem, isOpen) => {
                    return (
                      <View
                        className={`w-full h-12 border border-input rounded-lg flex-row justify-center items-center px-3`}>
                        <Text className={`flex-1 text-white`}>
                          {(selectedItem?.value === value &&
                            selectedItem.label) ||
                            label}
                        </Text>
                        <IconComponent
                          iconName={isOpen ? 'ChevronUp' : 'ChevronDown'}
                          color={themes[colorScheme].mutedForeground}
                        />
                      </View>
                    )
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        className={`w-full border border-input flex-row px-3 py-4 ${isSelected ? 'bg-secondary' : 'bg-background'}`}>
                        <Text className={`flex-1 text-foreground`}>
                          {item.label}
                        </Text>
                      </View>
                    )
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={{
                    backgroundColor: themes[colorScheme].mutedForeground,
                    borderRadius: 8,
                  }}
                />
              </View>
            )
          }}
        />
      </>
      {error?.message && (
        <Text className="text-red-500 mt-2">{error.message}</Text>
      )}
    </>
  )
}
