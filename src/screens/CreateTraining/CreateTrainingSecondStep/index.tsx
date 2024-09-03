import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { ModalWithContent } from '@components/ModalWithContent'
import { useRoute } from '@react-navigation/native'

import { Card } from './__components__/Card'
import { ConfigExercises } from './__components__/ConfigExercises'

type IRouteParams = {
  title: string
  selectedItems: IExercise[] | null
}

export function CreateTrainingSecondStep() {
  const route = useRoute()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { title, selectedItems } = route.params as IRouteParams

  const [isSelected, setIsSelected] = useState(false)

  return (
    <Container>
      <HeaderGoBack title={'Criar Treino'} />
      <View className="flex-1 px-5 mt-10 gap-4">
        <View className={'flex-row justify-between'}>
          <Heading title={title} />

          <Text className="text-foreground font-primary_bold tex-[16]">
            Etapa 2 de 2
          </Text>
        </View>

        {selectedItems.map((item) => (
          <Card
            item={item}
            key={item.id}
            openModal={() => setIsModalOpen(!isModalOpen)}
          />
        ))}

        {/* <>
          <Heading title="Configuração do exercício" />

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

          <View className="flex-row gap-3 items-center ">
            <Checkbox
              isChecked={isSelected}
              onPress={() => setIsSelected(!isSelected)}
            />

            <Text className="text-foreground font-primary_bold tex-[16]">
              Aplicar para todos os exercicios
            </Text>
          </View>

          <View className="flex-row gap-4 justify-end">
            <Button label="Cancelar" className="px-4" variant="secondary" />
            <Button label="Concluir" className="px-4" />
          </View>
        </> */}
      </View>

      {/* <Modal
        animationType={'fade'}
        transparent={false}
        statusBarTranslucent={true}
        visible={isModalOpen}>
        <View className="flex-1 items-center justify-center ">
          <View className="w-72 max-[500px]"></View>
          <ConfigExercises
            isSelected={isSelected}
            onSekected={() => setIsSelected(!isSelected)}
          />
        </View>
      </Modal> */}

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        content={
          <ConfigExercises
            isSelected={isSelected}
            onSekected={() => setIsSelected(!isSelected)}
          />
        }
      />
    </Container>
  )
}
