import React, { useContext, useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { IPersonalDTO } from '@_dtos_/personalDTO'
import { Container } from '@components/Container'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { ModalWithContent } from '@components/ModalWithContent'
import { Button } from '@components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import { useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQuery } from '@tanstack/react-query'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'
import { AppError } from '@utils/AppError'
import { toast } from '@utils/toast-methods'

import { ButtonFab } from './__components__/ButtonFab'
import { Planos } from './_tabs_/Planos'
import { Profile } from './_tabs_/Profile'

type IRouteParams = {
  id: string
  planId?: string
  isButtonComment: boolean
}

export function PersonalTrainerProfile() {
  const route = useRoute()
  const richText = useRef()
  const { colorScheme } = useContext(ThemeContext)

  const { id, planId } = route.params as IRouteParams
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, error } = useQuery<IPersonalDTO>({
    queryKey: ['get-personal-id', id],
    queryFn: async () => {
      const { data } = await api.get(`/list-personal/${id}`)

      return data.data as IPersonalDTO
    },
  })

  const handleSave = async () => {
    // Aqui você pode enviar ou salvar o conteúdo do editor
    richText.current &&
      (await richText.current?.getContentHtml().then((html) => {
        console.log(html)
        // Enviar ou salvar o HTML
      }))
  }

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
            <TabsTrigger id="planos" title="Plano" value="planos" />
          </TabsList>
          <TabsContent value="perfil">
            <Profile data={data} />
          </TabsContent>
          <TabsContent value="planos">
            <Planos data={data?.plan} planId={planId} />
          </TabsContent>
        </Tabs>
      </View>

      {planId && <ButtonFab onSubmit={() => setIsModalOpen(true)} />}

      <ModalWithContent
        title="Adicionar Comentário"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        content={
          <View style={{ flexGrow: 1, gap: 6 }}>
            <ScrollView>
              <RichEditor
                ref={richText}
                style={{
                  backgroundColor: themes[colorScheme].background,
                  borderColor: themes[colorScheme].input,
                  borderWidth: 1,
                  borderRadius: 6,
                }}
                editorStyle={{
                  color: themes[colorScheme].foreground,
                }}
                initialContentHTML="<p>O que achou da aula desse personal ?</p>"
                initialHeight={150}
                editorInitializedCallback={() => {
                  richText.current &&
                    richText.current?.setContentStyle({
                      backgroundColor: themes[colorScheme].background,
                    })
                }}
              />
            </ScrollView>

            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.heading1,
                actions.insertBulletsList,
                actions.insertOrderedList,
              ]}
              style={{ backgroundColor: themes[colorScheme].background }}
              iconTint={themes[colorScheme].popoverForeground}
            />

            <Button label="Comentar" />
          </View>
        }
      />
    </Container>
  )
}
