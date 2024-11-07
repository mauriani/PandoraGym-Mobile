import { Text } from 'react-native'

type IProps = {
  title: string
}

export function Heading({ title }: IProps) {
  return (
    <Text className="mb-2 font-primary_bold text-base text-foreground">
      {title}
    </Text>
  )
}
