import { Text, TouchableOpacity, View } from 'react-native'
import { cn } from '@utils/cn'

// TODO: make controlled (optional)
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
  label?: string
  labelClasses?: string
  checkboxClasses?: string
  isChecked: boolean
  onPress: () => void
}
function Checkbox({
  label,
  labelClasses,
  checkboxClasses,
  className,
  onPress,
  isChecked,
  ...props
}: CheckboxProps) {
  // const [isChecked, setChecked] = useState(false)

  // const toggleCheckbox = () => {
  //   setChecked((prev) => !prev)
  // }

  return (
    <View
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}>
      <TouchableOpacity onPress={onPress}>
        <View
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded border border-gray-700 bg-background',
            {
              'bg-primary': isChecked,
            },
            checkboxClasses,
          )}>
          {isChecked && <Text className="text-xs text-background">✓</Text>}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-primary', labelClasses)}>{label}</Text>
      )}
    </View>
  )
}

export { Checkbox }
