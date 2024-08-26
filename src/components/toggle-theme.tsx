import { useContext } from 'react'

import { ThemeContext } from '../theme/theme-provider'

import { Button } from './ui/Button'

export function ModeToggle() {
  const { toggleMode } = useContext(ThemeContext)

  return (
    <Button variant="secondary" label="dark mode" onPress={toggleMode}>
      Toggle mode
    </Button>
  )
}
