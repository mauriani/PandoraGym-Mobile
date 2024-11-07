import { Text } from 'react-native'

type IProps = {
  title: string
}

export function TitleSection({ title }: IProps) {
  return (
    <Text className="primary_regular text-[14px] text-muted-foreground">
      {title}
    </Text>
  )
}
