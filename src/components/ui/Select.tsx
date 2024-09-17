import React, { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import {
  FlatList,
  LayoutRectangle,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { cn } from '@utils/cn'

// Extra types to you if you need :)
export interface ISelectedOption {
  label: string
  value: string
}

export interface ISelectedOptionsArray {
  options?: ISelectedOption[]
}

export type ISelectedValue = string | number | undefined

const convertToOptions = <T extends Record<string, any>>(
  data?: T[],
  labelKey?: keyof T,
  valueKey?: keyof T,
): ISelectedOption[] => {
  if (!data || !labelKey || !valueKey) return []
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: item[valueKey],
  }))
}

export interface SelectProps {
  label?: string
  labelClasses?: string
  selectClasses?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  onSelect: (value: string | number) => void
  selectedValue?: string | number
  placeholder?: string
  labelKey: string
  valueKey: string
}

export const Select = ({
  label,
  labelClasses,
  selectClasses,
  options,
  onSelect,
  selectedValue,
  placeholder = 'Select an option',
  labelKey,
  valueKey,
}: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null)
  const selectButtonRef = useRef<TouchableOpacity>(null)

  const new_options = convertToOptions(options, labelKey, valueKey)

  const handleSelect = (value: string | number) => {
    onSelect(value)
    setIsDropdownOpen(false)
  }

  const openDropdown = () => {
    selectButtonRef.current?.measure((_fx, _fy, _w, _h, px, py) => {
      setDropdownPosition({
        x: px,
        y: py + _h,
        width: _w,
        height: _h,
      })
      setIsDropdownOpen(true)
    })
  }

  return (
    <View className={cn('flex flex-col gap-1.5')}>
      {label && (
        <Text className={cn('text-base text-primary', labelClasses)}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        ref={selectButtonRef}
        className={cn(
          selectClasses,
          'border border-input py-2.5 px-4 rounded-lg bg-white dark:bg-black',
        )}
        onPress={openDropdown}>
        <Text className="text-primary">
          {selectedValue
            ? new_options.find((option) => option.value === selectedValue)
                ?.label
            : placeholder}
        </Text>
      </TouchableOpacity>

      {/* Dropdown modal */}
      {isDropdownOpen && dropdownPosition && (
        <Modal visible={isDropdownOpen} transparent animationType="none">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setIsDropdownOpen(false)}>
            <View
              style={{
                top: dropdownPosition.y,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 5,
              }}
              className="absolute bg-white shadow-sm dark:bg-black p-2 rounded-md shadow-black dark:shadow-white">
              <FlatList
                data={new_options}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    className="p-2 border-b border-input">
                    <Text className="text-primary">{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  )
}

export const FormSelect = ({
  control,
  name,
  options,
  labelKey,
  valueKey,
  label,
  placeholder,
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select
          label={label}
          options={options}
          labelKey={labelKey}
          valueKey={valueKey}
          placeholder={placeholder}
          selectedValue={value}
          onSelect={onChange}
        />
      )}
    />
  )
}
