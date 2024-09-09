import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { ModalWithContent } from '@components/ModalWithContent'
import { Button } from '@components/ui/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { toast } from '@utils/toast-methods'

import { Card } from './__components__/Card'
import { ConfigExercises } from './__components__/ConfigExercises'

type IRouteParams = {
  title: string
  selectedItems: IExercise[] | null
}

export function CreateTrainingSecondStep() {
  const route = useRoute()
  const { navigate } = useNavigation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { title, selectedItems } = route.params as IRouteParams

  const [isSelected, setIsSelected] = useState(false)

  function handleCreateTraining() {
    toast.success('Treino criado com sucesso !')
    navigate('tabNavigator')
  }

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

        <Text className="text-muted-foreground font-primary_regular tex-[16]">
          Clique no exercício para configura-lo
        </Text>

        {selectedItems.map((item) => (
          <Card
            item={item}
            key={item.id}
            openModal={() => setIsModalOpen(!isModalOpen)}
          />
        ))}
      </View>

      <View
        style={{
          marginTop: 'auto',
          paddingHorizontal: 20,
          paddingBottom: getBottomSpace() + 60,
        }}>
        <Button label="Concluir" onPress={handleCreateTraining} />
      </View>

      <ModalWithContent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Configuração do exercício"
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
