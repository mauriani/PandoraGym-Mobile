import { ReactNode } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { CircleX } from 'lucide-react-native'

type IProps = {
  isOpen: boolean
  onClose?: () => void
  content: ReactNode
  title?: string
  subTitle?: string
}

export function ModalWithContent({
  isOpen,
  onClose,
  title,
  subTitle,
  content,
}: IProps) {
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
        <View className="flex-1 items-center justify-center bg-blend-overlay">
          <View className="w-[350px] max-h-[500px] bg-muted-foreground rounded-[8px] px-3">
            <TouchableOpacity onPress={onClose}>
              <CircleX size={25} className="self-end m-2 text-title" />
            </TouchableOpacity>

            <View className="gap-1 pl-2 pb-1">
              {title && (
                <Text className="text-title text-md font-primary_semibold">
                  {title}
                </Text>
              )}

              {subTitle && (
                <Text className="text-text text-sm font-secondary_regular">
                  {subTitle}
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
