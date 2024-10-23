import { Modal, Text, TouchableOpacity, View } from 'react-native'

type IProps = {
  isOpen: boolean
  message: string
  title: string
  isButtonCancel?: boolean
  isButtonTitleConfirm?: string
  onConfirm: (() => void) | (() => Promise<void | boolean>)
  close: () => void
}

export function DialogAlert({
  isOpen,
  title,
  message,
  isButtonCancel,
  isButtonTitleConfirm,
  close,
  onConfirm,
}: IProps) {
  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="w-64 bg-white dark:bg-gray-800 rounded-lg p-5 gap-2">
          <Text className="text-lg font-bold text-black dark:text-white">
            {title}
          </Text>
          <Text className="text-sm text-black dark:text-gray-300 mb-2">
            {message}
          </Text>

          <View className="flex-row justify-end gap-2 mt-auto">
            {isButtonCancel && (
              <TouchableOpacity
                className="items-center justify-center rounded-lg border border-red-400 bg-white px-4 py-2"
                onPress={close}>
                <Text className="text-red-400">Cancelar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              className="items-center justify-center rounded-lg bg-purple-500 px-4 py-2"
              onPress={() => {
                onConfirm()
                close()
              }}>
              <Text className="text-white">{isButtonTitleConfirm}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
