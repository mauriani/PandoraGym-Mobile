import { TouchableOpacity } from 'react-native'
import { IconComponent, IconNames } from '@components/IconComponent'
type IProps = {
  onSubmit: () => void
  iconName: IconNames
}

export function ButtonFab({ onSubmit, iconName }: IProps) {
  return (
    <TouchableOpacity
      testID="button-fab"
      className="absolute bottom-9 right-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-800 shadow-md"
      style={{
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }}
      onPress={onSubmit}>
      <IconComponent iconName={iconName} size={25} />
    </TouchableOpacity>
  )
}
