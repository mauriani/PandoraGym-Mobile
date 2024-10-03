import React, { useContext } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

import {
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownItemSeparator,
  DropDownTrigger,
} from './ui/DropDown'
import { IconComponent, IconNames } from './IconComponent'

export interface DropDownItemProps {
  iconName: IconNames
  label: string
  onPress: () => void // Função para acionar quando o item for clicado
}

interface IconDropDownProps {
  items: DropDownItemProps[]
}

const IconDropDown: React.FC<IconDropDownProps> = ({ items }) => {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <DropDown>
      <DropDownTrigger>
        <TouchableOpacity className="w-14 h-14 justify-center items-center bg-muted rounded-full">
          <IconComponent iconName="Ellipsis" />
        </TouchableOpacity>
      </DropDownTrigger>

      <DropDownContent className="absolute z-[1000] top-[45px] right-0 bg-background w-56">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <DropDownItem>
              <TouchableOpacity
                className="flex flex-row gap-2 items-center"
                onPress={item.onPress}>
                <IconComponent
                  iconName={item.iconName}
                  color={themes[colorScheme].foreground}
                />
                <Text className="text-white text-xl">{item.label}</Text>
              </TouchableOpacity>
            </DropDownItem>
            {index < items.length - 1 && <DropDownItemSeparator />}
          </React.Fragment>
        ))}
      </DropDownContent>
    </DropDown>
  )
}

export default IconDropDown
