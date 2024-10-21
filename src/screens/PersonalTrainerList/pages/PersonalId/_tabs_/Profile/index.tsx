import { useContext, useEffect } from 'react'
import { Image, Text, View } from 'react-native'
import { IComment } from '@_dtos_/commentDTO'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { ContentScroll } from '@components/ContentScroll'
import { Heading } from '@components/Heading'
import { Loading } from '@components/Loading'
import { NoContent } from '@components/NoContent'
import { useAuth } from '@hooks/auth'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'
import { CircleDollarSign, Star, Users } from 'lucide-react-native'

import { Comment } from '../../__components__/Comment'
import { TitleSection } from '../../__components__/TitleSection'

type IProps = {
  data: IPersonalDTO
  personalId: string
}

export function Profile({ data, personalId }: IProps) {
  const { user } = useAuth()
  const { colorScheme } = useContext(ThemeContext)

  const {
    data: comments,
    error,
    isFetching,
  } = useQuery<IComment[]>({
    queryKey: ['get-comments', user?.user?.id],
    queryFn: async () => {
      const { data } = await api.post('/comments', {
        personalId,
      })

      return data
    },
  })

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar comentários. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
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
                {data?.plan[0]?.price && (
                  <>
                    <CircleDollarSign
                      color={themes[colorScheme].primary}
                      size={20}
                    />
                    <Text className="text-white primary_bold font-bold text-xs">
                      R$ {data?.plan[0]?.price} por hora/aula
                    </Text>
                  </>
                )}
              </View>

              <View className="flex-row gap-2 items-center">
                <Users color={themes[colorScheme].primary} size={20} />

                <Text className="text-white primary_bold font-bold text-xs">
                  {data?.student.length} alunos
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

          <TitleSection title="Sobre mim" />

          <View className="bg-secondary rounded-[6px] px-2 py-2">
            <Text className="text-foreground font-primary_regular text-md leading-6">
              {data?.description}
            </Text>
          </View>

          <TitleSection title="Comentários" />

          {comments?.length > 0 ? (
            comments.map((item, index) => <Comment key={index} item={item} />)
          ) : (
            <NoContent message="Este Personal não possuí nenhuma avaliação até o momento!" />
          )}
        </ContentScroll>
      )}
    </>
  )
}
