import { Platform, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { Button } from '@components/ui/Button'

type IProps = {
  label: string
  onSubmit: () => void
  paddingHorizontal?: number
}

export function Footer({ label, onSubmit, paddingHorizontal = 20 }: IProps) {
  return (
    <View
      style={{
        marginTop: 'auto',
        paddingHorizontal,
        paddingBottom:
          Platform.OS == 'ios' ? getBottomSpace() + 60 : getBottomSpace() + 10,
      }}>
      <Button label={label} onPress={onSubmit} />
    </View>
  )
}
