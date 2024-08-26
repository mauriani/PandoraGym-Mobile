import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'
import { cn } from '@utils/cn'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, ...props }, ref) => (
    <View className={cn('flex flex-col', className)}>
      {label && (
        <Text className={cn('text-base text-muted-foreground', labelClasses)}>
          {label}
        </Text>
      )}
      <TextInput
        className={cn(
          inputClasses,
          'border border-input py-4 px-4 rounded-lg text-muted-foreground text-sm',
        )}
        {...props}
      />
    </View>
  ),
)

export { Input }
