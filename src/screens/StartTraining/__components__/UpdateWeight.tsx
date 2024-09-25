import { useState } from 'react'
import { View } from 'react-native'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

type IProps = {
  weight: number
  getUpdateWeight: (weight: string) => void
  onClose: () => void
  loading: boolean
}

export function UpdateWeight({
  weight,
  getUpdateWeight,
  onClose,
  loading,
}: IProps) {
  const [updateWeight, setupdateWeight] = useState('')

  return (
    <View className="gap-5 py-3">
      <Input
        label={`${weight}`}
        keyboardType="numeric"
        onChangeText={(text) => {
          setupdateWeight(text)
        }}
      />

      <Button
        label="Salvar"
        loading={loading}
        onPress={() => {
          getUpdateWeight(updateWeight)
          onClose()
        }}
      />
    </View>
  )
}
