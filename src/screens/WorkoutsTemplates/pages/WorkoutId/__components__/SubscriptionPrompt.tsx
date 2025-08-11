import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { Button } from '@components/ui/Button'
import { useContext } from 'react'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

interface SubscriptionPromptProps {
  isVisible: boolean
  onClose: () => void
  onUpgrade: () => void
  workoutTitle: string
  personalId?: string
}

export function SubscriptionPrompt({
  isVisible,
  onClose,
  onUpgrade,
  workoutTitle,
  personalId,
}: SubscriptionPromptProps) {
  const { colorScheme } = useContext(ThemeContext)
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full max-w-sm rounded-2xl bg-background p-6">
          {/* Header */}
          <View className="mb-4 items-center">
            <View className="mb-3 rounded-full bg-yellow-500/20 p-4">
              <IconComponent
                iconName="Crown"
                size={32}
                color={themes[colorScheme].primary}
              />
            </View>
            <Text className="text-center text-xl font-bold text-white">
              Conteúdo Premium
            </Text>
          </View>

          {/* Content */}
          <View className="mb-6">
            <Text className="mb-4 text-center text-sm text-muted-foreground">
              O treino "{workoutTitle}" é exclusivo para assinantes. Assine um
              plano para ter acesso completo a todos os exercícios e
              funcionalidades.
            </Text>

            <View className="rounded-lg bg-secondary/30 p-4">
              <Text className="mb-2 font-medium text-white">
                Com a assinatura você terá:
              </Text>
              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <IconComponent
                    iconName="Check"
                    size={16}
                    color={themes[colorScheme].success}
                  />
                  <Text className="text-sm text-muted-foreground">
                    Acesso a todos os exercícios
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent
                    iconName="Check"
                    size={16}
                    color={themes[colorScheme].success}
                  />
                  <Text className="text-sm text-muted-foreground">
                    Treinos personalizados
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent
                    iconName="Check"
                    size={16}
                    color={themes[colorScheme].success}
                  />
                  <Text className="text-sm text-muted-foreground">
                    Acompanhamento profissional
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent
                    iconName="Check"
                    size={16}
                    color={themes[colorScheme].success}
                  />
                  <Text className="text-sm text-muted-foreground">
                    Suporte direto com personal
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <Button
              label={personalId ? 'Ver Planos' : 'Explorar Planos'}
              onPress={onUpgrade}
              variant="default"
            />
            <TouchableOpacity onPress={onClose} className="items-center py-3">
              <Text className="text-sm text-muted-foreground">
                Continuar sem assinar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
