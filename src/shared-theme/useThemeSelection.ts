
      // shared-theme/src/useThemeSelection.ts

import { ThemeMode, ThemeName } from './types'
import { a, b, c, d } from './theme'
import { useMemo, useState } from 'react'

import { createTheme } from '@mui/material/styles'

interface ThemeActions {
  changeTheme: (themeName: ThemeName) => void
  toggleColorMode: () => void
}

export const useThemeSelection = (defaultTheme: ThemeName, defaultMode: ThemeMode) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme)

  const theme = useMemo(() => {
    const selectedTheme =
      themeName === 'a'
        ? a(mode)
        : themeName === 'b'
        ? b(mode)
        : themeName === 'c'
        ? c(mode)
        : d(mode)

    return createTheme(selectedTheme)
  }, [mode, themeName])

  const themeActions: ThemeActions = {
    changeTheme: (newThemeName: ThemeName) => {
      setThemeName(newThemeName)
    },
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }

  return { theme, themeActions }
}
