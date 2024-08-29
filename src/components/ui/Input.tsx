import { forwardRef } from 'react'
import { TextInput, View } from 'react-native'
import { cn } from '@utils/cn'

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string
  labelClasses?: string
  inputClasses?: string
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, inputClasses, ...props }) => (
    <View className={cn('flex flex-col', className)}>
      <TextInput
        placeholder={label} // O label será usado como placeholder
        placeholderTextColor="gray" // Cor do placeholder
        className={cn(
          inputClasses,
          'border border-input py-4 px-4 rounded-lg text-white text-sm bg-black', // Fundo preto, texto branco
        )}
        {...props}
      />
    </View>
  ),
)

export { Input }
