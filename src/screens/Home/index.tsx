import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ITraining } from '@_dtos_/index'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { MyTrainingCard } from '@components/MyTrainingCard'
import { Input } from '@components/ui/Input'
import { Plus } from 'lucide-react-native'

export function Home() {
  const data: ITraining[] = [
    {
      id: '1',
      title: 'Treino de Peito',
      description: `Seg,Qua,Sex`,
      image:
        'https://plus.unsplash.com/premium_photo-1663013143273-c7f032f07d89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      title: 'Treino de Costas',
      description: `Ter`,
      image:
        'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      title: 'Treino de Peito',
      description: `Quin`,
      image:
        'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4',
      title: 'Treino de Abdomen',
      description: `Sab`,
      image:
        'https://images.unsplash.com/photo-1669323149885-6bda5714e85b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]
  return (
    <Container>
      <Header title={'Meus Treinos'} />
      <View className="px-5 mt-10">
        <Heading title="Criar Treino" />

        <View style={styles.containerCreateTraining}>
          <Input label="Nome do treino/exercício" className="w-[85%]" />

          <TouchableOpacity className="rounded-[6px] bg-purple-800 w-14 justify-center items-center ml-2">
            <Plus color={'#FDC500'} size={20} />
          </TouchableOpacity>
        </View>

        <Heading title="Meus Treinos" />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            data?.length == 0
              ? {
                  flexGrow: 1,
                  padding: 10,
                }
              : { paddingBottom: 60, gap: 12 }
          }
          renderItem={({ item }) => <MyTrainingCard item={item} />}
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  containerCreateTraining: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
})
