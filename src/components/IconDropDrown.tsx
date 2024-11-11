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
        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-full bg-muted">
          <IconComponent iconName="Ellipsis" />
        </TouchableOpacity>
      </DropDownTrigger>

      <DropDownContent className="absolute right-0 top-[45px] z-[1000] w-56 bg-background">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <DropDownItem>
              <TouchableOpacity
                className="flex flex-row items-center gap-2"
                onPress={item.onPress}>
                <IconComponent
                  iconName={item.iconName}
                  color={themes[colorScheme].foreground}
                />
                <Text className="text-xl text-white">{item.label}</Text>
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
