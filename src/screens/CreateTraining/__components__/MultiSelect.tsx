import React, { useContext, useEffect, useState } from 'react'
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form'
import { Text, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { IconComponent } from '@components/IconComponent'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

interface IData {
  label: string
  value: string
  key?: number | string
}

interface IProps {
  color?: string
  name: string
  defaultValue?: string[]
  label?: string
  error?: FieldError | undefined
  control: Control<FieldValues>
  options: IData[]
  change?: (value: string[]) => void
}

export function MultiSelect({
  name,
  error,
  label,
  defaultValue = [],
  options,
  control,
  change,
}: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultValue)

  const handleSelect = (selectedItem: IData) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelection = prevSelectedItems.includes(selectedItem.value)
        ? prevSelectedItems.filter((item) => item !== selectedItem.value)
        : [...prevSelectedItems, selectedItem.value]

      if (change) change(updatedSelection) // Chama a função de mudança com a seleção atualizada
      return updatedSelection
    })
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            onChange(selectedItems) // Atualiza o valor do campo no react-hook-form
          }, [selectedItems, onChange])

          return (
            <View className="my-4">
              <SelectDropdown
                data={options}
                onSelect={(selectedItem) => {
                  handleSelect(selectedItem)
                }}
                renderButton={(selectedItem, isOpen) => (
                  <View
                    className={`w-full h-14 border border-input rounded-lg flex-row justify-center items-center px-3 bg-black`}>
                    <Text className={`flex-1 text-white`}>
                      {selectedItems.length > 0
                        ? selectedItems
                            .map(
                              (value) =>
                                options.find((option) => option.value === value)
                                  ?.label,
                            )
                            .join(', ') // Exibe os rótulos dos itens selecionados
                        : label}
                    </Text>
                    <IconComponent
                      iconName={isOpen ? 'ChevronUp' : 'ChevronDown'}
                      color={themes[colorScheme].mutedForeground}
                    />
                  </View>
                )}
                renderItem={(item) => (
                  <View
                    className={`w-full border border-input flex-row px-3 py-4 ${selectedItems.includes(item.value) ? 'bg-secondary' : 'bg-background'}`}>
                    <Text className={`flex-1 text-foreground`}>
                      {item.label}
                    </Text>
                    {selectedItems.includes(item.value) && (
                      <IconComponent
                        iconName={'CheckCheck'}
                        color={themes[colorScheme].mutedForeground}
                      />
                    )}
                  </View>
                )}
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

      {error?.message && (
        <Text className="text-red-500 mt-2">{error.message}</Text>
      )}
    </>
  )
}
