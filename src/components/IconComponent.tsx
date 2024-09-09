import React, { useContext } from 'react'
import { TextStyle } from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import * as LucideIcons from 'lucide-react-native'

// Tipagem dos nomes dos ícones
export type IconNames = keyof typeof LucideIcons

// Tipagem das propriedades do componente de ícone
export type IconProps = {
  iconName: IconNames
  color?: string
  size?: number
  style?: TextStyle
}

// Componente de Ícone
export const IconComponent: React.FC<IconProps> = ({
  iconName,
  color,
  size,
  style,
}) => {
  const Icon = LucideIcons[iconName] as React.ElementType
  const { colorScheme } = useContext(ThemeContext)
  return (
    <Icon
      size={size ?? 24}
      color={color ?? themes[colorScheme].primary}
      style={style}
    />
  )
}
