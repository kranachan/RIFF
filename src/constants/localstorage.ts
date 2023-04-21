import { ThemeOptions } from './theme'

export type LocalStorageMap = {
  token: string
  themeOptions: Omit<ThemeOptions, 'deviceScheme'>
}
