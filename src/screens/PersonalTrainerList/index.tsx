import React from 'react'
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { IPersonal } from '@_dtos_/personalDTO'
import { Container } from '@components/Container'
import { Header } from '@components/Header'
import { Input } from '@components/ui/Input'
import { useNavigation } from '@react-navigation/native'

import { Card } from './__components__/Card'

export function PersonalTrainerList() {
  const { navigate } = useNavigation()

  const personal: IPersonal[] = [
    {
      id: '1',
      name: 'Julia Rekamie',
      image:
        'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      credencial: 'Certificado Personal Trainer (CPT)',
      especializacao: 'Cardio interval Training (HIIT)',
      experiencia: '5 anos',
      rating: 4,
    },
    {
      id: '2',
      name: 'Aline Rekamie',
      image:
        'https://media.istockphoto.com/id/1466988074/photo/a-fit-muscular-female-personal-trainer-is-holding-tablet-in-her-hands-and-smiling-at-the.webp?b=1&s=612x612&w=0&k=20&c=PJHOPdWhhE9F863ScFTLRVOlUZQoTXr2P3-BEb5cfbw=',
      credencial: 'Certificado Personal Trainer (CPT)',
      especializacao: 'Cardio interval Training (HIIT)',
      experiencia: '4 anos',
      rating: 4,
    },
    {
      id: '3',
      name: 'Marcos Antônio',
      image:
        'https://media.istockphoto.com/id/1483989790/photo/adult-indian-male-yoga-instructor-smiling-at-the-camera-and-holding-a-yoga-mat-under-his-arm.webp?b=1&s=612x612&w=0&k=20&c=2G7rtUS5Sie2h38C0dHMOwSdLYuzvEFjtNd7DJd060w=',
      credencial: 'Certificado Personal Trainer (CPT)',
      especializacao: 'Cardio interval Training (HIIT)',
      experiencia: '4 anos',
      rating: 3,
    },
    {
      id: '4',
      name: 'Marcos Antônio',
      image:
        'https://rwfitness.com/wp-content/uploads/2022/03/Best-Personal-Trainers-in-Edgewater-MD.png',
      credencial: 'Certificado Personal Trainer (CPT)',
      especializacao: 'Cardio interval Training (HIIT)',
      experiencia: '4 anos',
      rating: 5,
    },
  ]
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Header title={'Personal trainers'} />

          <View className="flex-1 px-5 mt-10">
            <Input label="Buscar personal" className="mb-2" />
            <FlatList
              data={personal}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                personal?.length == 0
                  ? {
                      flexGrow: 1,
                      padding: 10,
                    }
                  : { paddingBottom: 30, gap: 12, paddingTop: 10 }
              }
              renderItem={({ item }) => (
                <Card
                  key={item.id}
                  item={item}
                  onPress={() => navigate('personalTrainerProfile')}
                />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}
