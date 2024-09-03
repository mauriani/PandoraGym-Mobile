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
        'px-5 py-5 rounded-[6px] justify-center items-center',
        active ? 'bg-purple-800' : 'bg-black border border-muted',
      )}>
      <Text
        className={clsx(
          'text-[12px]',
          active
            ? 'font-primary_bold text-foreground'
            : 'text-muted-foreground',
        )}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
