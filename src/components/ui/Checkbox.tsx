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
            'w-7 h-7 border border-gray-700 rounded bg-background flex justify-center items-center',
            {
              'bg-primary': isChecked,
            },
            checkboxClasses,
          )}>
          {isChecked && <Text className="text-background text-xs">✓</Text>}
        </View>
      </TouchableOpacity>
      {label && (
        <Text className={cn('text-primary', labelClasses)}>{label}</Text>
      )}
    </View>
  )
}

export { Checkbox }
