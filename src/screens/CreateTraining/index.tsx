import React, { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { IExercise } from '@_dtos_/SelectExerciseDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { SelectExerciseCard } from '@components/SelectExerciseCard'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

export function CreateTraining() {
  const [selectedItems, setSelectedItems] = useState([])

  const data: IExercise[] = [
    {
      id: '1',
      title: 'Rosca direta barra W',
      image:
        'https://alexandrebento.com.br/wp-content/uploads/2023/08/rosca-direta-barra-w-1024x683.jpg',
    },
    {
      id: '2',
      title: 'Elevação lateral',
      image:
        'https://vitat.com.br/wp-content/uploads/2022/05/beautiful-athletic-girl-dressed.jpg',
    },
    {
      id: '3',
      title: 'Agachamento Livre',
      image:
        'https://cdn.atletis.com.br/atletis-website/base/973/e7a/969/agachamento-barra-livre.jpg',
    },
    {
      id: '4',
      title: 'Agachamento Sumo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMKF1kYSWNT3TRR-WYvDVMfnMgS7i7EVnR0bQOYJH6IcZzzwmqHlMlt0Q_ytlCmhxKfk&usqp=CAU',
    },
    {
      id: '5',
      title: 'Agachamento Sumo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMKF1kYSWNT3TRR-WYvDVMfnMgS7i7EVnR0bQOYJH6IcZzzwmqHlMlt0Q_ytlCmhxKfk&usqp=CAU',
    },
    {
      id: '6',
      title: 'Agachamento Sumo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMKF1kYSWNT3TRR-WYvDVMfnMgS7i7EVnR0bQOYJH6IcZzzwmqHlMlt0Q_ytlCmhxKfk&usqp=CAU',
    },
  ]

  // Função para alternar a seleção de um item
  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((itemId) => itemId !== id)
      } else {
        return [...prevSelectedItems, id]
      }
    })
  }

  return (
    <Container>
      <HeaderGoBack title={'Criar Treino'} />

      <View className="flex-1 px-5 mt-10 gap-4">
        <View className={'flex-row justify-between'}>
          <Heading title="Titulo do treino" />

          <Text className="text-foreground font-primary_bold tex-[16]">
            Etapa 1 de 2
          </Text>
        </View>

        <Input label="Buscar exercicio" />

        <Text className="text-foreground font-primary_bold tex-[16]">
          Listagem de exercícios
        </Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            data?.length == 0
              ? {
                  flexGrow: 1,
                }
              : { paddingBottom: getBottomSpace() + 80, gap: 12 }
          }
          renderItem={({ item }) => (
            <SelectExerciseCard
              item={item}
              isSelected={selectedItems.includes(item.id)}
              toggleSelectItem={toggleSelectItem}
            />
          )}
        />
      </View>

      <View
        style={{
          marginTop: 'auto',
          paddingHorizontal: 20,
          paddingBottom: getBottomSpace() + 60,
        }}>
        <Button label="Próxima Etapa" />
      </View>
    </Container>
  )
}
