import { Text, TouchableOpacity } from 'react-native'
import clsx from 'clsx'

type IProps = {
  active: boolean
  label: string
}

export function ButtonCategories({ active, label }: IProps) {
  return (
    <TouchableOpacity
      className={clsx(
        'items-center justify-center rounded-[6px] px-4 py-4',
        active ? 'bg-purple-800' : 'border border-muted bg-black',
      )}>
      <Text
        className={clsx(
          'text-sm',
          active
            ? 'font-primary_bold text-foreground'
            : 'text-muted-foreground',
        )}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
