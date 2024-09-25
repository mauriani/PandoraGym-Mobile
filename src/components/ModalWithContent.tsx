import { ReactNode, useContext } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { X } from 'lucide-react-native'

type IProps = {
  isOpen: boolean
  onClose?: () => void
  content: ReactNode
  title?: string
  subTitle?: string
}

export function ModalWithContent({ isOpen, onClose, title, content }: IProps) {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      statusBarTranslucent={true}
      visible={isOpen}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <View style={styles.container}>
          <View
            style={styles.content}
            className="bg-secondary px-4 py-2 rounded-[6px]">
            <TouchableOpacity onPress={onClose}>
              <X
                size={25}
                style={{ alignSelf: 'flex-end', margin: 12 }}
                color={themes[colorScheme].popoverForeground}
              />
            </TouchableOpacity>

            <View className="gap-1 mb-3 pl-1">
              {title && (
                <Text className="text-foreground font-primary_regular text-lg font-bold">
                  {title}
                </Text>
              )}
            </View>

            {content}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    width: 350,
    maxHeight: 500,
  },
})
