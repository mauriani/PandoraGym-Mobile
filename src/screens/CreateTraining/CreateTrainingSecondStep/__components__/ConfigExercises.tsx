import { Text, View } from 'react-native'
import { Button } from '@components/ui/Button'
import { Checkbox } from '@components/ui/Checkbox'
import { Input } from '@components/ui/Input'

type IProps = {
  isSelected: boolean
  onSekected: () => void
}

export function ConfigExercises({ isSelected, onSekected }: IProps) {
  return (
    <View className="gap-2">
      <View className="flex-row justify-between">
        <Input placeholder="Número de sets/rodadas" label={'Rodadas'} />
        <Input placeholder="Número de repetições" label={'Reps'} />
      </View>

      <View className="flex-row justify-between">
        <Input placeholder="Tempo de descanço" label={'Descanço'} />
        <Input placeholder="Carga" label={'Peso'} />
      </View>

      <Input
        placeholder="Tempo de descanço entre sets"
        label={'Descanço entre os exercício'}
      />

      <View className="flex-row gap-4 items-center ">
        <Checkbox isChecked={isSelected} onPress={onSekected} />

        <Text className="text-foreground font-primary_bold tex-[16]">
          Aplicar para todos os exercicios
        </Text>
      </View>

      <View className="flex-row gap-4 justify-end">
        <Button label="Cancelar" className="px-5" variant="outline" />
        <Button label="Concluir" className="px-5" />
      </View>
    </View>
  )
}
