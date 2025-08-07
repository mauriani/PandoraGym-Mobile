import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { RichEditor } from 'react-native-pell-rich-editor'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { ModalWithContent } from '@components/ModalWithContent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { api } from '@services/api'
import { getTokenPlanStorage } from '@storage/index'
import { useQuery } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { RootStackParamList } from '../../../../routes/stack.routes'

import { ButtonFabActions } from '../../../../components/ButtonFabActions'

import { EditorText } from './__components__/EditorText'
import { Planos } from './_tabs_/Planos'
import { Profile } from './_tabs_/Profile'

type IRouteParams = {
  id: string
  name: string
}

export function PersonalId() {
  const route = useRoute()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const richText = useRef<RichEditor>(null)

  const { id } = route.params as IRouteParams
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [comment, setComment] = useState('')

  const planId = getTokenPlanStorage()

  const { data, error, refetch, isFetching } = useQuery<IPersonalDTO>({
    queryKey: ['get-personal-id', id],
    queryFn: async () => {
      const { data } = await api.get(`/trainers/${id}`)

      return data.data as IPersonalDTO
    },
  })

  const handleGetContentHtmlEditor = useCallback(async () => {
    const content = await richText.current.getContentHtml()

    const mensagem = content.toString()

    setComment(mensagem)
  }, [])

  const handleGetEditor = () => {
    return richText.current
  }

  async function handleCommentPersonal() {
    try {
      await api
        .post('/comment', {
          comment,
          personalId: id,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)
          }

          setIsModalOpen(!isModalOpen)
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
    }
  }

  // const isPlanIdInData = data?.plan?.some((plan) => plan.id === planId)

  useEffect(() => {
    if (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao buscar os treinos. Tente novamente mais tarde'

      toast.error(title)
    }
  }, [error])

  return (
    <Container>
      <HeaderGoBack title={'Trainers'} />

      <View className="mt-3">
        <Tabs defaultValue="perfil">
          <TabsList>
            <TabsTrigger id="perfil" title="Perfil" value="perfil" />
            <TabsTrigger id="planos" title="Planos" value="planos" />
          </TabsList>
          <TabsContent value="perfil">
            <Profile data={data} personalId={id} loading={isFetching} />
          </TabsContent>
          <TabsContent value="planos">
            <Planos data={data?.plan} planId={planId} refetch={refetch} />
          </TabsContent>
        </Tabs>
      </View>

      {/* {isPlanIdInData && (
        <ButtonFabActions
          actions={[
            {
              iconName: 'Calendar',
              onPress: () =>
                navigation.navigate('scheduling', {
                  personalId: id,
                  personalName: data?.name || 'Personal',
                }),
            },
            {
              iconName: 'MessageCircleMore',
              onPress: () => setIsModalOpen(true),
            },
          ]}
        />
      )} */}

      <ModalWithContent
        title="Adicionar Comentário"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        content={
          <EditorText
            richText={richText}
            handleGetContentHtmlEditor={handleGetContentHtmlEditor}
            handleGetEditor={handleGetEditor}
            comment={comment}
            onSubmit={() => handleCommentPersonal()}
          />
        }
      />
    </Container>
  )
}
