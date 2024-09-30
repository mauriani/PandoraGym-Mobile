import { useContext } from 'react'
import { Image, Text, View } from 'react-native'
import { IComment } from '@_dtos_/commentDTO'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { ContentScroll } from '@components/ContentScroll'
import { Heading } from '@components/Heading'
import { ButtonSports } from '@screens/PersonalTrainerProfile/__components__/ButtonSports'
import { Comment } from '@screens/PersonalTrainerProfile/__components__/Comment'
import { TitleSection } from '@screens/PersonalTrainerProfile/__components__/TitleSection'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { CircleDollarSign, Star, Users } from 'lucide-react-native'

type IProps = {
  data: IPersonalDTO
}

export function Profile({ data }: IProps) {
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
    <ContentScroll>
      <View className="flex-row gap-4 items-center">
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: data?.user?.avatarUrl,
          }}
          alt=""
        />

        <View className="flex-col gap-2">
          <Heading title={data?.user?.name} />

          <View className="flex-row gap-2 items-center">
            <CircleDollarSign color={themes[colorScheme].primary} size={20} />

            {data?.plan[0]?.price && (
              <Text className="text-white primary_bold font-bold text-xs">
                R$ {data?.plan[0]?.price} por hora/aula
              </Text>
            )}
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
              {data?.rating} (23 avaliações)
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
          {data?.description}
        </Text>
      </View>

      <TitleSection title="Comentários" />

      {comments.map((item, index) => (
        <Comment key={index} item={item} />
      ))}
    </ContentScroll>
  )
}
