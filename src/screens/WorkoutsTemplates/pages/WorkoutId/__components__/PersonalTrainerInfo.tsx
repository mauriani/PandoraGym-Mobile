import { Text, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { Personal } from '@_dtos_/detailsTemplateDTO'

interface PersonalTrainerInfoProps {
  personal: Personal
  onViewProfile: () => void
}

export function PersonalTrainerInfo({
  personal,
  onViewProfile,
}: PersonalTrainerInfoProps) {
  return (
    <View className="mb-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/20 to-primary/10 p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="mb-2 flex-row items-center gap-2">
            <View className="rounded-full bg-primary/20 p-2">
              <IconComponent iconName="Award" size={16} color="#F97316" />
            </View>
            <Text className="text-sm font-semibold text-primary">
              Treino Personalizado
            </Text>
          </View>

          <Text className="mb-1 font-medium text-white">
            {personal.name || 'Personal Trainer Certificado'}
          </Text>

          <Text className="text-sm text-muted-foreground">
            Este treino foi desenvolvido por um personal trainer profissional
            com foco em resultados efetivos e seguros.
          </Text>
        </View>

        <TouchableOpacity
          onPress={onViewProfile}
          className="ml-3 rounded-lg bg-primary px-4 py-2">
          <View className="flex-row items-center gap-1">
            <IconComponent iconName="User" size={16} color="#FFF" />
            <Text className="text-sm font-medium text-white">Ver Perfil</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View className="mt-4 flex-row justify-between border-t border-primary/10 pt-4">
        <View className="flex-row items-center gap-1">
          <IconComponent iconName="CheckCircle" size={14} color="#10B981" />
          <Text className="text-xs text-muted-foreground">Certificado</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <IconComponent iconName="CheckCircle" size={14} color="#10B981" />
          <Text className="text-xs text-muted-foreground">Personalizado</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <IconComponent iconName="CheckCircle" size={14} color="#10B981" />
          <Text className="text-xs text-muted-foreground">Acompanhamento</Text>
        </View>
      </View>
    </View>
  )
}
