import React, { useState } from 'react'
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ITraining } from '@_dtos_/trainingDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Header } from '@components/Header'
import { Heading } from '@components/Heading'
import { MyTrainingCard } from '@components/MyTrainingCard'
import { Input } from '@components/ui/Input'
import { useNavigation } from '@react-navigation/native'
import { toast } from '@utils/toast-methods'
import { Plus } from 'lucide-react-native'
import { z } from 'zod'

export const formValidationSchema = z.object({
  tituloTreino: z.string({ required_error: 'Campo obrigatório!' }).min(1, {
    message: 'Campo obrigatório!',
  }),
})

export type zodSchema = z.infer<typeof formValidationSchema>

export function Home() {
  const { navigate } = useNavigation()
  const [title, setTitle] = useState('')
  const data: ITraining[] = [
    {
      id: '1',
      title: 'Treino de Pernas',
      description: `Seg, Sex`,
      image:
        'https://plus.unsplash.com/premium_photo-1663013143273-c7f032f07d89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      title: 'Treino de Gluteo',
      description: `Ter`,
      image:
        'https://blog.ciaathletica.com.br/wp-content/uploads/2024/03/Cia-Athletica-avanco-Autores-Grupo-S2-Marketing-Freepik-1024x684.jpg',
    },
    {
      id: '3',
      title: 'Treino de Costas',
      description: `Qua`,
      image:
        'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4',
      title: 'Treino de Abdomen',
      description: `Qui`,
      image:
        'https://images.unsplash.com/photo-1669323149885-6bda5714e85b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  function handleNavigate() {
    if (title?.length == 0) {
      toast.error('Para continuar informe o titulo do treino')
    } else {
      navigate('createTrainingFirstStep', {
        title,
      })

      setTitle('')
    }
  }

  function handleAccessTraining(id_exercise: string, name: string) {
    navigate('startTraining', {
      id_exercise,
      name,
    })
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <Header title={'Meus Treinos'} />
          <Content>
            <Heading title="Criar Treino" />

            <View style={styles.containerCreateTraining}>
              <Input
                label="Nome do treino/exercício"
                className="w-[85%]"
                onChangeText={(text) => setTitle(text)}
              />

              <TouchableOpacity
                activeOpacity={title.length > 0 ? 0.2 : 0.2}
                className="rounded-[6px] bg-purple-800 w-14 justify-center items-center ml-2 z-10"
                onPress={handleNavigate}>
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
                  : { paddingBottom: 80, gap: 12 }
              }
              renderItem={({ item }) => (
                <MyTrainingCard
                  item={item}
                  onAccessTraining={handleAccessTraining}
                />
              )}
            />
          </Content>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}

const styles = StyleSheet.create({
  containerCreateTraining: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
})
