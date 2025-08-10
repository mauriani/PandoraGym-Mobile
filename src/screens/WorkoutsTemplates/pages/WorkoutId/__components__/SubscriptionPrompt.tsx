import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { Button } from '@components/ui/Button'

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
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-background rounded-2xl p-6 w-full max-w-sm">
          {/* Header */}
          <View className="items-center mb-4">
            <View className="bg-yellow-500/20 p-4 rounded-full mb-3">
              <IconComponent iconName="Crown" size={32} color="#EAB308" />
            </View>
            <Text className="text-white font-bold text-xl text-center">
              Conteúdo Premium
            </Text>
          </View>

          {/* Content */}
          <View className="mb-6">
            <Text className="text-muted-foreground text-center text-sm mb-4">
              O treino "{workoutTitle}" é exclusivo para assinantes. 
              Assine um plano para ter acesso completo a todos os exercícios e funcionalidades.
            </Text>

            <View className="bg-secondary/30 rounded-lg p-4">
              <Text className="text-white font-medium mb-2">
                Com a assinatura você terá:
              </Text>
              <View className="gap-2">
                <View className="flex-row items-center gap-2">
                  <IconComponent iconName="Check" size={16} color="#10B981" />
                  <Text className="text-muted-foreground text-sm">
                    Acesso a todos os exercícios
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent iconName="Check" size={16} color="#10B981" />
                  <Text className="text-muted-foreground text-sm">
                    Treinos personalizados
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent iconName="Check" size={16} color="#10B981" />
                  <Text className="text-muted-foreground text-sm">
                    Acompanhamento profissional
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <IconComponent iconName="Check" size={16} color="#10B981" />
                  <Text className="text-muted-foreground text-sm">
                    Suporte direto com personal
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View className="gap-3">
            <Button
              label={personalId ? "Ver Planos" : "Explorar Planos"}
              onPress={onUpgrade}
              variant="default"
            />
            <TouchableOpacity
              onPress={onClose}
              className="py-3 items-center">
              <Text className="text-muted-foreground text-sm">
                Continuar sem assinar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
