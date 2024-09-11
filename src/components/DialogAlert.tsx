import { Text } from 'react-native'
import { View } from 'lucide-react-native'

import { Button } from './ui/Button'
import { Dialog, DialogContent, DialogTrigger } from './ui/Dialog'

export function DialogAlert() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button label="Open Dialog" />
      </DialogTrigger>
      <DialogContent>
        <View className="flex gap-4">
          <Text className="font-semibold text-xl text-primary">
            Dialog Content
          </Text>
          <Text className="text-primary">
            Tap outside the dialog to close it.
          </Text>
        </View>
      </DialogContent>
    </Dialog>
  )
}
