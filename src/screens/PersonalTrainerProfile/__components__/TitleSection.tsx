import { Text } from 'react-native'

type IProps = {
  title: string
}

export function TitleSection({ title }: IProps) {
  return (
    <Text className="text-muted-foreground primary_regular text-[14px]">
      {title}
    </Text>
  )
}
