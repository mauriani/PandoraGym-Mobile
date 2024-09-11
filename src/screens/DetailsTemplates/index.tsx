import { FlatList, Image, Text, View } from 'react-native'
import { ITrainingHistory } from '@_dtos_/trainingHistoryDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { Heading } from '@components/Heading'
import { IconComponent } from '@components/IconComponent'
import { SubTitle } from '@components/SubTitle'
import { VideoPlayerWithThumbnail } from '@components/VideoPlayerWithThumbnail'
import { useRoute } from '@react-navigation/native'
import { extractVideoId } from '@utils/extractVideoId'

import { ButtonWithIcon } from '../../components/ButtonWithIcon'

type IRouteParams = {
  title: string
}

export function DetailsTemplate() {
  const route = useRoute()

  const { title } = route.params as IRouteParams

  const data: ITrainingHistory[] = [
    {
      id: '1',
      title: 'Flexão de braço',
      image:
        'https://plus.unsplash.com/premium_photo-1663013143273-c7f032f07d89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      volume: '3 séries x 12 repetições',
      time: '00:30',
      load: '0kg',
    },
    {
      id: '2',
      title: 'Flexão de braço inclinada',
      image:
        'https://blog.ciaathletica.com.br/wp-content/uploads/2024/03/Cia-Athletica-avanco-Autores-Grupo-S2-Marketing-Freepik-1024x684.jpg',
      volume: '3 séries x 12 repetições',
      time: '1:00',
      load: '20kg',
    },
    {
      id: '3',
      title: 'Rosca martelo',
      image:
        'https://image.tuasaude.com/media/article/eq/sm/rosca-martelo_63246_l.jpg',
      volume: '3 séries x 12 repetições',
      time: '1:00',
      load: '20kg',
    },
    {
      id: '4',
      title: 'Rosca martelo',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17kdd6OCtzKfBwjzgdcTmdOgTJkpWyz-ffw&s',
      volume: '3 séries x 12 repetições',
      time: '00:60',
      load: '20kg',
    },
    {
      id: '5',
      title: 'Rosca martelo',
      image:
        'https://images.unsplash.com/photo-1669323149885-6bda5714e85b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      volume: '3 séries x 12 repetições',
      time: '1:30',
      load: '20kg',
    },
    {
      id: '6',
      title: 'Rosca martelo',
      image:
        'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      volume: '3 séries x 12 repetições',
      time: '00:40',
      load: '20kg',
    },
  ]

  return (
    <Container>
      <HeaderGoBack title={title} />
      <Content>
        <View className="flex-row items-center  py-5">
          <VideoPlayerWithThumbnail
            thumbnailUrl={
              'https://blogdohiellevy.com.br/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-27-at-13.22.20-768x1024.jpeg'
            }
            videoId={extractVideoId(
              'https://www.youtube.com/watch?v=T-gAM6dUN5o&ab_channel=GrowthTV',
            )}
          />
        </View>

        <View className="flex-row mb-4 gap-3">
          <ButtonWithIcon title={'60 min'} iconName="Clock1" />

          <ButtonWithIcon title={'350 Cal'} iconName="Flame" />

          <ButtonWithIcon title={'Meu Perfil'} iconName="User" />
        </View>

        <Text className="text-white font-primary_regular text-sm mb-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </Text>

        <Heading title={'Exercícios'} />

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
          renderItem={({ item }) => (
            <View className="h-32 flex-row gap-4 bg-secondary rounded-[8px] items-center p-2 relative">
              <Image
                className="h-full w-20 rounded-[6px]"
                source={{
                  uri: item.image,
                }}
                alt=""
              />

              <View className="flex-col justify-center gap-1 ml-3">
                <Text className="text-white font-bold text-base">
                  {item.title}
                </Text>
                <Text className="text-muted-foreground text-sm">
                  {item.volume}
                </Text>

                <View className="flex-row justify-between items-center gap-2">
                  <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
                    <IconComponent iconName="Timer" size={20} />
                    <SubTitle title={`${item?.time}`} />
                  </View>

                  <View className="flex-row items-center gap-2 bg-accent px-2 py-2 rounded-[6px]">
                    <IconComponent iconName="Weight" size={20} />
                    <SubTitle title={`${item?.load}`} />
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </Content>
    </Container>
  )
}
