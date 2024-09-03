import React from 'react'
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'

import { ButtonCategories } from './__components__/ButtonCategories'

export function ReadyGymWorkouts() {
  // const data: IExercise[] = [
  //   {
  //     id: '1',
  //     title: 'Rosca direta barra W',
  //     image:
  //       'https://alexandrebento.com.br/wp-content/uploads/2023/08/rosca-direta-barra-w-1024x683.jpg',
  //   },
  //   {
  //     id: '2',
  //     title: 'Elevação lateral',
  //     image:
  //       'https://vitat.com.br/wp-content/uploads/2022/05/beautiful-athletic-girl-dressed.jpg',
  //   },
  //   {
  //     id: '3',
  //     title: 'Agachamento Livre',
  //     image:
  //       'https://cdn.atletis.com.br/atletis-website/base/973/e7a/969/agachamento-barra-livre.jpg',
  //   },
  //   {
  //     id: '4',
  //     title: 'Agachamento Sumo',
  //     image:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMKF1kYSWNT3TRR-WYvDVMfnMgS7i7EVnR0bQOYJH6IcZzzwmqHlMlt0Q_ytlCmhxKfk&usqp=CAU',
  //   },
  // ]

  const categories = [
    'Musculação',
    'Calistenia',
    'Crossfit',
    'Street workout',
    'Yoga',
  ]

  const workoutsReady = [
    {
      id: '1',
      title: 'Treinos recomendados',
      training: [
        {
          id: '1',
          title: 'Treino de pernas',
          level: 'Avançado',
          tumbnail:
            'https://images.unsplash.com/photo-1675026482808-33f7515ecddd?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '2',
          title: 'Treino de ombros',
          level: 'Avançado',
          tumbnail:
            'https://images.unsplash.com/photo-1579758682665-53a1a614eea6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '3',
          title: 'Treino de ombros',
          level: 'Avançado',
          tumbnail:
            'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
    {
      id: '2',
      title: 'Guias de tecnicas',
      training: [
        {
          id: '1',
          title: 'Treino de biceps',
          level: 'Intermediário',
          tumbnail:
            'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '2',
          title: 'Treino de costas',
          level: 'Intermediário',
          tumbnail:
            'https://images.unsplash.com/photo-1659350774685-04b709a54863?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D',
        },
        {
          id: '3',
          title: 'Treino de costas',
          level: 'Intermediário',
          tumbnail:
            'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
    {
      id: '3',
      title: 'HIIT',
      training: [
        {
          id: '1',
          title: 'Treino de core',
          level: 'Iniciante',
          tumbnail:
            'https://plus.unsplash.com/premium_photo-1664109999840-3f7e97489e53?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '2',
          title: 'Treino de costas',
          level: 'Intermediário',
          tumbnail:
            'https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dHJlaW5vJTIwZGUlMjBoaWl0fGVufDB8fDB8fHww',
        },
        {
          id: '3',
          title: 'Treino de costas',
          level: 'Intermediário',
          tumbnail:
            'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    },
  ]

  return (
    <Container>
      <Header title={'Programas de treino'} />

      <ScrollView className="px-5 mt-10 gap-4">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}>
          {categories.map((item, index) => (
            <ButtonCategories key={index} label={item} active={false} />
          ))}
        </ScrollView>

        {workoutsReady.map((item) => (
          <View key={item.id} className="mb-4">
            <Heading title={item.title} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}>
              {item.training.map((training) => (
                <ImageBackground
                  key={training.id}
                  className="h-44 w-72 rounded-[8px]"
                  source={{
                    uri: training.tumbnail,
                  }}>
                  <View className="h-44 justify-between p-4">
                    <TouchableOpacity className="bg-black rounded-[6px] w-28 h-10 justify-center items-center">
                      <Text className="text-foreground font-primary_bold text-[14px]">
                        {training.level}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-foreground font-primary_bold text-[16px]">
                      {training.title}
                    </Text>
                  </View>
                </ImageBackground>
              ))}
            </ScrollView>
          </View>
        ))}

        {/* <Heading title="Treinos recomendados" />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}>
          <ImageBackground
            className="h-44 w-72 rounded-[8px]"
            source={{
              uri: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}>
            <View className="h-44 justify-between p-4">
              <TouchableOpacity className="bg-black rounded-[6px] w-20 h-10 justify-center items-center">
                <Text className="text-foreground font-primary_bold text-[14px]">
                  Avançado
                </Text>
              </TouchableOpacity>

              <Text className="text-foreground font-primary_bold text-[16px]">
                Listagem de exercícios
              </Text>
            </View>
          </ImageBackground>

          <ImageBackground
            className="h-44 w-72 rounded-[8px]"
            source={{
              uri: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}>
            <View className="h-44 justify-between p-4">
              <TouchableOpacity className="bg-black rounded-[6px] w-20 h-10 justify-center items-center">
                <Text className="text-foreground font-primary_bold text-[14px]">
                  Avançado
                </Text>
              </TouchableOpacity>

              <Text className="text-foreground font-primary_bold text-[16px]">
                Listagem de exercícios
              </Text>
            </View>
          </ImageBackground>
        </ScrollView> */}
      </ScrollView>
    </Container>
  )
}
