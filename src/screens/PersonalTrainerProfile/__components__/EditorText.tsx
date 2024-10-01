import { useContext, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Button } from '@components/ui/Button'
import { ThemeContext } from '@theme/theme-provider'
import { themes } from '@theme/themes'

export function EditorText() {
  const richText = useRef(null)
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
          initialContentHTML="<p>O que achou da aula desse personal ?</p>"
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

      <Button label="Comentar" />
    </View>
  )
}
