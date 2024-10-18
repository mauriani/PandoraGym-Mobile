import { forwardRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { IconComponent } from '@components/IconComponent'
import { cn } from '@utils/cn'

const Avatar = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'relative flex h-40 w-40 shrink-0 overflow-hidden rounded-full',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

const AvatarImage = forwardRef<
  React.ElementRef<typeof Image>,
  React.ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return null
  }
  return (
    <Image
      ref={ref}
      onError={() => setHasError(true)}
      className={cn('aspect-square h-full w-full', className)}
      {...props}
      alt=""
    />
  )
})
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & { textClassname?: string }
>(({ children, className, textClassname, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className,
    )}
    {...props}>
    <Text className={cn('text-2xl font-semibold text-primary', textClassname)}>
      {children}
    </Text>
  </View>
))
AvatarFallback.displayName = 'AvatarFallback'

const AvatarEditButton = ({ onEditPress }) => (
  <TouchableOpacity
    onPress={onEditPress}
    className="h-11 w-11 absolute rounded-full items-center justify-center bottom-2 right-[-5px] bg-purple-800">
    <IconComponent iconName="Camera" size={24} />
  </TouchableOpacity>
)

const AvatarWithEdit = ({ imageUrl, onEditPress }) => {
  return (
    <Avatar>
      {imageUrl ? (
        <AvatarImage source={{ uri: imageUrl }} />
      ) : (
        <AvatarFallback>AB</AvatarFallback> // Fallback para caso não tenha imagem
      )}
      <AvatarEditButton onEditPress={onEditPress} />
    </Avatar>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarEditButton, AvatarWithEdit }
