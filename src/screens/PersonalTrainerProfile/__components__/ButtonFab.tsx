import { TouchableOpacity } from 'react-native'
import { IconComponent } from '@components/IconComponent'
type IProps = {
  onSubmit: () => void
}

export function ButtonFab({ onSubmit }: IProps) {
  return (
    <TouchableOpacity
      className="absolute bottom-9 right-5 bg-purple-800 w-16 h-16 rounded-full flex justify-center items-center shadow-md"
      style={{
        elevation: 5, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }}
      onPress={onSubmit}>
      <IconComponent iconName={'MessageCircleMore'} size={25} />
    </TouchableOpacity>
  )
}
