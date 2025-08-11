import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { UserData } from '@_dtos_/profileDTO'
import { Container } from '@components/Container'
import { Content } from '@components/Content'
import { Footer } from '@components/Footer'
import { HeaderGoBack } from '@components/HeaderGoBack'
import { InputMaskControl } from '@components/InputMaskControl'
import { SelecFormControlt } from '@components/SelecFormControlt'
import { TextAreaFormControl } from '@components/TextAreaFormControl'
import { InputFormControl } from '@components/ui/InputFormControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation, useRoute } from '@react-navigation/native'
import { api } from '@services/api'
import { useQueryClient } from '@tanstack/react-query'
import { AppError } from '@utils/AppError'
import { objectives } from '@utils/objectives'
import { toast } from '@utils/toast-methods'
import zod from 'zod'

const schema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'O campo de nome é obrigatório' })
    .refine((value) => value.trim().includes(' '), {
      message: 'O campo precisa do nome completo.',
    }),
  email: zod
    .string()
    .min(1, { message: 'O campo de e-mail é obrigatório' })
    .email(),
  age: zod
    .string()
    .min(1, { message: 'O campo de idade é obrigatório' })
    .transform((value) => (value ? parseInt(value) : null)),
  phone: zod.string().min(1, { message: 'O campo de nome é obrigatório' }),
  weight: zod
    .string()
    .min(1, { message: 'O campo de nome é obrigatório' })
    .transform((value) => (value ? parseInt(value) : null)),
  objective: zod.string().min(1, { message: 'O campo de nome é obrigatório' }),
  medicalCondition: zod.string(),
  observations: zod.string(),
})

export type zodSchema = zod.infer<typeof schema>

type IRouteParams = {
  user: any
}

export function EditProfile() {
  const route = useRoute()
  const { goBack } = useNavigation()
  const queryClient = useQueryClient()

  const { user } = route.params as IRouteParams

  const methods = useForm<zodSchema>({
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  async function submit(data: zodSchema) {
    const { age, objective, weight, observations, medicalCondition } = data

    try {
      await api
        .post('/profile/update-profile', {
          age,
          objective,
          weight,
          observations,
          medicalCondition,
        })
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message)

            queryClient.invalidateQueries({
              queryKey: ['get-profile-user-id'],
            })

            goBack()
          }
        })
    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Ocorreu um erro ao registrar Treino. Tente novamente mais tarde !'

      toast.error(title)
    }
  }

  return (
    <Container>
      <HeaderGoBack title="Editar Perfil" />

      <Content>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled">
          <View className="mt-3 flex-1 flex-col gap-4">
            <InputFormControl
              control={control}
              name="name"
              label="Nome"
              error={errors.name}
              autoCorrect={false}
              editable={false}
              defaultValue={user?.name}
            />

            <InputFormControl
              control={control}
              name="email"
              label="E-mail"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              defaultValue={user?.email}
            />

            <InputMaskControl
              control={control}
              name="phone"
              label="Telefone"
              error={errors.phone}
              type="phone"
              defaultValue={`${user?.phone}`}
            />

            <InputFormControl
              control={control}
              name="age"
              label="Idade"
              error={errors.age}
              keyboardType="numeric"
              defaultValue={`${user?.age}`}
            />

            <InputFormControl
              control={control}
              name="weight"
              label="Peso"
              error={errors.weight}
              keyboardType="numeric"
              defaultValue={`${user?.weight}`}
            />

            <SelecFormControlt
              control={control}
              name="objective"
              label={user?.objective ?? 'Objetivo'}
              options={objectives}
              error={errors.objective}
              defaultValue={user?.objective}
            />

            <InputFormControl
              control={control}
              name="medicalCondition"
              label="Condição Médica"
              error={errors.medicalCondition}
              multiline
              defaultValue={`${user?.medicalCondition}`}
            />

            <TextAreaFormControl
              control={control}
              name="observations"
              label="Observações"
              error={errors.observations}
              defaultValue={`${user?.observations}`}
            />
          </View>
        </ScrollView>

        <Footer
          label={'Atualizar'}
          paddingHorizontal={0}
          onSubmit={handleSubmit(submit)}
        />
      </Content>
    </Container>
  )
}
