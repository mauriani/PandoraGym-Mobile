import { useContext } from 'react'
import { ScrollView, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Button } from '@components/ui/Button'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

type IProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  richText: React.MutableRefObject<any>
  handleGetContentHtmlEditor: (text?: string | null) => void
  comment: string
  handleGetEditor?: () => void
  onSubmit: () => void
}

export function EditorText({
  richText,
  handleGetContentHtmlEditor,
  comment,
  handleGetEditor,
  onSubmit,
}: IProps) {
  const { colorScheme } = useContext(ThemeContext)

  return (
    <View style={{ flexGrow: 1, gap: 6 }}>
      <ScrollView>
        <RichEditor
          ref={richText}
          style={{
            backgroundColor: themes[colorScheme].background,
            borderColor: themes[colorScheme].input,
            borderWidth: 1,
            borderRadius: 6,
          }}
          editorStyle={{
            color: themes[colorScheme].foreground,
            backgroundColor: themes[colorScheme].background,
          }}
          initialContentHTML={comment}
          onChange={handleGetContentHtmlEditor}
          placeholder="Digite o seu comentário ..."
          initialHeight={150}
          editorInitializedCallback={() => {
            richText.current &&
              richText.current?.setContentStyle({
                backgroundColor: themes[colorScheme].background,
              })
          }}
        />
      </ScrollView>

      <RichToolbar
        editor={richText}
        getEditor={handleGetEditor}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
          actions.insertBulletsList,
          actions.insertOrderedList,
        ]}
        style={{ backgroundColor: themes[colorScheme].background }}
        iconTint={themes[colorScheme].popoverForeground}
      />

      <Button label="Comentar" onPress={onSubmit} />
    </View>
  )
}
