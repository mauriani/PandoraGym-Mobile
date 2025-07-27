import { forwardRef } from 'react'
import { Text, TextInput, View } from 'react-native'
import { cn } from '@utils/cn'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
  placeholder?: string
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, inputClasses, placeholder, ...props }, ref) => (
    <View className={cn('flex flex-col gap-1', className)}>
      {placeholder && (
        <Text className="pb-2 font-primary_regular text-muted-foreground">
          {placeholder}
        </Text>
      )}

      <TextInput
        ref={ref}
        placeholder={label} // O label será usado como placeholder
        placeholderTextColor="gray" // Cor do placeholder
        className={cn(
          inputClasses,
          'rounded-lg border border-input bg-black px-4 py-4 text-sm text-white', // Fundo preto, texto branco
        )}
        {...props}
      />
    </View>
  ),
)

export { Input }
