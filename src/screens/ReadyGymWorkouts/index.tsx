import React from 'react'
import { ScrollView, View } from 'react-native'
import { ItemplateDTO } from '@_dtos_/templateDTO'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { useNavigation } from '@react-navigation/native'

import { ButtonCategories } from './__components__/ButtonCategories'
import { CardWorkouts } from './__components__/CardWorkouts'

export function ReadyGymWorkouts() {
  const { navigate } = useNavigation()

  const categories = [
    'Musculação',
    'Calistenia',
    'Crossfit',
    'Street workout',
    'Yoga',
  ]

  const workoutsReady: ItemplateDTO[] = [
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

  function handleNavigaDetails(title: string) {
    navigate('detailsTemplate', {
      title,
    })
  }

  return (
    <Container>
      <Header title={'Programas de treino'} />

      <ScrollView
        contentContainerStyle={{
          gap: 12,
          padding: 12,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}>
          {categories.map((item, index) => (
            <ButtonCategories key={index} label={item} active={false} />
          ))}
        </ScrollView>

        {workoutsReady.map((item) => (
          <View key={item.id} className="gap-4">
            <Heading title={item.title} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}>
              {item.training.map((training) => (
                <CardWorkouts
                  key={training.id}
                  training={training}
                  onNavigate={handleNavigaDetails}
                />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </Container>
  )
}
