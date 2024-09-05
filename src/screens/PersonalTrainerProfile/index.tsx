import React, { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { IComment } from '@_dtos_/commentDTO'
import { Container } from '@components/Container'
import { ContentScroll } from '@components/ContentScroll'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { CircleDollarSign, Star, Users } from 'lucide-react-native'

import { ButtonSports } from './__components__/ButtonSports'
import { Comment } from './__components__/Comment'
import { TitleSection } from './__components__/TitleSection'

export function PersonalTrainerProfile() {
  const { colorScheme } = useContext(ThemeContext)

  const comments: IComment[] = [
    {
      id: '1',
      image:
        'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: ' Aline Garcia',
      date_created: 'Criado em 31/03/2023',
      comment:
        'Perfeito! Ótimo profissional, responde rápido, entende do que faz!',
    },
    {
      id: '2',
      image:
        'https://plus.unsplash.com/premium_photo-1663040472837-4d2051b93735?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU2fHxneW18ZW58MHx8MHx8fDA%3D',
      name: ' Pedro Antõnio',
      date_created: 'Criado em 31/03/2023',
      comment: 'Perfeito! Excelente profissional! Pontual e muito dedicada.',
    },
    {
      id: '3',
      image:
        'https://images.unsplash.com/photo-1639653818737-7e884dc84954?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYyfHxneW18ZW58MHx8MHx8fDA%3D',
      name: ' André Silva',
      date_created: 'Criado em 31/03/2023',
      comment:
        'Perfeito! Andre tem muita experiência e recomendo para quem quer aprender a se cuidar melhor, tanto na parte de exercícios como na parte da alimentação.',
    },
  ]

  return (
    <Container>
      <HeaderGoBack title={'Trainers'} />

      <ContentScroll>
        <View className="flex-row gap-4 items-center">
          <Image
            className="h-32 w-32 rounded-full"
            source={{
              uri: 'https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            alt=""
          />

          <View className="flex-col gap-2">
            <Heading title="Julia Rekamie" />

            <View className="flex-row gap-2 items-center">
              <CircleDollarSign color={themes[colorScheme].primary} size={20} />

              <Text className="text-white primary_bold font-bold text-xs">
                R$ 70 por hora/aula
              </Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <Users color={themes[colorScheme].primary} size={20} />

              <Text className="text-white primary_bold font-bold text-xs">
                50 alunos
              </Text>
            </View>

            <View className="flex-row gap-2 items-center">
              <Star
                size={16}
                color={themes[colorScheme].primary}
                fill={themes[colorScheme].primary}
              />

              <Text className="text-white primary_bold font-bold text-xs">
                5 (23 avaliações)
              </Text>
            </View>
          </View>
        </View>

        <View className="gap-2 mt-2">
          <TitleSection title="Esportes" />

          <View className="flex-row gap-3">
            <ButtonSports title="🥊 Boxe" />
            <ButtonSports title="🏃‍♂️ Corrida" />
            <ButtonSports title="🏋️ Workout" />
          </View>
        </View>

        <TitleSection title="Sobre mim" />

        <View className="bg-secondary rounded-[6px] px-2 py-2">
          <Text className="text-foreground font-primary_regular text-md leading-6">
            A aula é completamente personalizada para seu objetivo, dentro das
            possibilidade de materiais, espaço e condicionamento físico prévio.
            Pode ser feita em academias de condomínio ou em academia de rede,
            também levo em consideração a preferência do tipo de atividade
            física que o aluno mais gosta. O foco é atingir o objetivo do aluno
            de maneira sustentável e inteligente.
          </Text>
        </View>

        <TitleSection title="Comentários" />

        {comments.map((item, index) => (
          <Comment key={index} item={item} />
        ))}
      </ContentScroll>
    </Container>
  )
}
