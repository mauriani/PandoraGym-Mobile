import { View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Button } from '@components/ui/Button'

type IProps = {
  label: string
  onSubmit: () => void
}

export function Footer({ label, onSubmit }: IProps) {
  return (
    <View
      style={{
        marginTop: 'auto',
        paddingHorizontal: 20,
        paddingBottom: getBottomSpace() + 60,
      }}>
      <Button label={label} onPress={onSubmit} />
    </View>
  )
}
