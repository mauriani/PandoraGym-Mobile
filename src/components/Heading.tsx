import { Text } from 'react-native'

type IProps = {
  title: string
}

export function Heading({ title }: IProps) {
  return (
    <Text className="text-foreground font-primary_bold text-base mb-2">
      {title}
    </Text>
  )
}
